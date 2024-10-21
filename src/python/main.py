import pandas as pd
import numpy as np
import json

general_df = pd.read_csv("src/database/baseDeDados.csv", sep=';' , encoding='latin-1')

dictionary_temp = {}

years = general_df['year'].drop_duplicates().to_list()

#generates the main database
for year in years:
    dictionary_temp[str(year)] = {}
    df_year = general_df[general_df['year'] == year]
    months = df_year['month'].drop_duplicates().to_list()
    for month in months:
        dictionary_temp[str(year)][month] = {}
        df_month = df_year[df_year['month'] == month]
        
        df_projetos = df_month[df_month['category'] == 'projetos']
        df_zeladoria = df_month[df_month['category'] == 'zeladoria']
        df_contratos = df_month[df_month['category'] == 'contratos']
        df_adm = df_month[df_month['category'] == 'adminstracao']
        df_entradas = df_month[df_month['category'] == 'entrada']
        df_saidas = df_month[df_month['category'] == 'saida']
        df_geral = df_month[df_month['category'] == 'geral']

        df_saidas = df_saidas.sort_values(by='description', ascending=True)
        df_zeladoria = df_zeladoria.sort_values(by='cost', ascending=False)
        df_adm = df_adm.sort_values(by='cost', ascending=False)
        df_contratos = df_contratos.sort_values(by='cost', ascending=False)
        df_projetos = df_projetos.sort_values(by='cost', ascending=False)
        df_entradas = df_entradas.sort_values(by='cost', ascending=False)

        df_adm = df_adm[df_adm['cost'] != 0]
        df_entradas = df_entradas[df_entradas['cost'] != 0]
        
        df_zelas_categories = pd.DataFrame(columns=['description', 'cost'])
        
        for categoria in df_zeladoria['description'].drop_duplicates().to_list():
            df_temp = pd.DataFrame([[categoria,df_zeladoria[df_zeladoria['description'] == categoria].sum()['cost']]], columns=['description','cost'])
            df_zelas_categories = pd.concat([df_zelas_categories, df_temp], ignore_index=True, axis=0)
            

        dictionary_temp[str(year)][month]["categorias gerais"] = df_saidas['description'].to_list()
        dictionary_temp[str(year)][month]['gastos gerais'] = df_saidas['cost'].to_list()
        dictionary_temp[str(year)][month]['projetos'] = df_projetos['description'].to_list()
        dictionary_temp[str(year)][month]['custos projetos'] = df_projetos['cost'].to_list()
        dictionary_temp[str(year)][month]['zeladoria'] = df_zelas_categories['description'].to_list()
        dictionary_temp[str(year)][month]['custos zeladoria'] = df_zelas_categories['cost'].to_list()
        dictionary_temp[str(year)][month]['contratos'] = df_contratos['description'].to_list()
        dictionary_temp[str(year)][month]['custos contratos'] = df_contratos['cost'].to_list()
        dictionary_temp[str(year)][month]['administracao'] = df_adm['description'].to_list()
        dictionary_temp[str(year)][month]['custos adm'] = df_adm['cost'].to_list()
        dictionary_temp[str(year)][month]['entradas'] = df_entradas['description'].to_list()
        dictionary_temp[str(year)][month]['valor entradas'] = df_entradas['cost'].to_list()

        total_entradas = sum(dictionary_temp[str(year)][month]['valor entradas'])
        total_saidas = sum(dictionary_temp[str(year)][month]['gastos gerais'])
        print(df_month)
        saldo_inicial = df_month[df_month['description'] == 'Saldo Inicial']['cost'].to_list()[0]
        saldo_final = df_month[df_month['description'] == 'Saldo Final']['cost'].to_list()[0]

        dictionary_temp[str(year)][month]['saldoFinal'] = saldo_final
        dictionary_temp[str(year)][month]['saldoInicial'] = saldo_inicial
        dictionary_temp[str(year)][month]['totalEntradas'] = total_entradas
        dictionary_temp[str(year)][month]['totalSaidas'] = total_saidas


with open(f'src/database/database.json', '+w') as f:
    json.dump(dictionary_temp, f)