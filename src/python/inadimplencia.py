import gspread
import pandas as pd
import json
import time

sa = gspread.service_account(filename='service_account_new.json')

ssBaseDeDados = sa.open("Python Controle Mensalidade - Base de dados(Testes)")

base = ssBaseDeDados.worksheet("H8")

df = pd.DataFrame(base.get_all_values()[1:], columns=base.get_all_values()[0])

meses_120=["OUTUBRO 2024", "SETEMBRO 2024", "AGOSTO 2024","JULHO 2024","JUNHO 2022", "MAIO 2024", "ABRIL 2024", "MARÇO 2024", "FEVEREIRO 2024", "JANEIRO 2024", "DEZEMBRO 2023", "NOVEMBRO 2023", "OUTUBRO 2023", "SETEMBRO 2023", "AGOSTO 2023", "JULHO 2023", "JUNHO 2023", "MAIO 2023", "ABRIL 2023", "MARÇO 2023", "FEVEREIRO 2023", "JANEIRO 2023", "DEZEMBRO 2022", "NOVEMBRO 2022", "OUTUBRO 2022", "SETEMBRO 2022", "AGOSTO 2022", "JULHO 2022"]

meses_53 = ["OUTUBRO 2021", "SETEMBRO 2021", "AGOSTO 2021", "JULHO 2021", "JUNHO 2021", "MAIO 2021", "ABRIL 2021", "MARÇO 2021", "FEVEREIRO 2021", "JANEIRO 2021", "DEZEMBRO 2020", "NOVEMBRO 2020", "OUTUBRO 2020", "JULHO 2020", "JUNHO 2020", "MAIO 2020", "ABRIL 2020"]

GAGA8 = 40000
COPINHA = 12000
BANHEIROCASD = 30000
EVTOL = 10000

boletos_90 = 0
boletos_120 = 0
boletos_53 = 0
turmas = {}
n_devendo = {
    '1-3':0,
    '4-6':0,
    '7-9':0,
    '10+':0
}
df = df[df['BOLETO'] != 'FALSO']
df = df[df['ALUNO'] != '']


for index, row in enumerate(df['TURMA'].to_list()):
    for indexc, col in enumerate(df.iloc[index].to_list()):
        if(str(col).upper() == 'NÃO PAGO' and df.columns[indexc-2] != "OUTUBRO 2024"):
            mes = df.columns[indexc-2]
            if mes in meses_120:
                boletos_120+=1
            elif mes in meses_53:
                boletos_53+=1
            else:
                boletos_90+=1
            try:    
                turmas['T' + str(row)[-2:]] += 1
            except:
                turmas['T' + str(row)[-2:]] = 1
           

for index, row in enumerate(df['DEVENDO'].to_list()):
    #print(df['ALUNO'].iloc[index])
    if(int(row) > 0):
        if(int(row) < 4):
            n_devendo['1-3'] += 1
        elif(int(row) < 7):
            n_devendo['4-6'] += 1
        elif(int(row) < 10):
            n_devendo['7-9'] += 1
        else:
            n_devendo['10+'] += 1
            
        
print(turmas)
print(n_devendo)

deficit = boletos_120*120 + boletos_53*53 + boletos_90*90
print("Valor de Inadimplência geral: R$" + str(deficit))

relatorio_inadim = {}

relatorio_inadim['turmas'] = turmas
relatorio_inadim['n_devendo'] = n_devendo
relatorio_inadim['deficit'] = {
    'deficit':deficit,
    'gaga8':int(deficit/GAGA8),
    'evtol':int(deficit/EVTOL),
    'CASD':int(deficit/BANHEIROCASD),
    'copinha':int(deficit/COPINHA)
}

with open(f'src/database/inadimplencia.json', '+w') as f:
    json.dump(relatorio_inadim, f)

