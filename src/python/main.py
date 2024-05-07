import pandas as pd
import numpy as np
import json

general_df = pd.read_csv("src/database/baseDeDados.csv", sep=';' , encoding='latin-1')

dictionary_temp = {
    "categorias gerais":[
        "projetos",
        "zeladoria",
        "contratos",
        "administração",
        "tarifas administrativas",
        "taxas de cobrança"
    ],
    "gastos gerais":[],
    "projetos":[],
    "custos projetos": [],
    "zeladoria":[],
    "custos zeladoria":[],
    "contratos":[],
    "custos contratos":[],
    "administracao": [],
    "custos adm": [],
    "totalEntradas": 0,
    "totalSaidas": 0,
    "saldoInicial": 0,
    "saldoFinal": 0,
    "entradas": [],
    "valor entradas": []
}

year = 2023
month = 'Julho'

df_year = general_df[general_df['year'] == year]
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

dictionary_temp["categorias gerais"] = df_saidas['description'].to_list()
dictionary_temp['gastos gerais'] = df_saidas['cost'].to_list()
dictionary_temp['projetos'] = df_projetos['description'].to_list()
dictionary_temp['custos projetos'] = df_projetos['cost'].to_list()
dictionary_temp['zeladoria'] = df_zeladoria['description'].to_list()
dictionary_temp['custos zeladoria'] = df_zeladoria['cost'].to_list()
dictionary_temp['contratos'] = df_contratos['description'].to_list()
dictionary_temp['custos contratos'] = df_contratos['cost'].to_list()
dictionary_temp['administracao'] = df_adm['description'].to_list()
dictionary_temp['custos adm'] = df_adm['cost'].to_list()
dictionary_temp['entradas'] = df_entradas['description'].to_list()
dictionary_temp['valor entradas'] = df_entradas['cost'].to_list()

total_entradas = sum(dictionary_temp['valor entradas'])
total_saidas = sum(dictionary_temp['gastos gerais'])
saldo_inicial = df_month[df_month['description'] == 'Saldo Inicial']['cost'].to_list()[0]
saldo_final = df_month[df_month['description'] == 'Saldo Final']['cost'].to_list()[0]

dictionary_temp['saldoFinal'] = saldo_final
dictionary_temp['saldoInicial'] = saldo_inicial
dictionary_temp['totalEntradas'] = total_entradas
dictionary_temp['totalSaidas'] = total_saidas

with open(f'src/database/{year}{month}.json', '+w') as f:
    json.dump(dictionary_temp, f)