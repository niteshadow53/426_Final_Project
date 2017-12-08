import json

with open('games.txt') as f:
    i = 0
    jsdata = ""
    dicts = []
    for line in f:
        id = "010" + str(i)
        i += 2
        games = line.strip().split(',')
        gamesDict = {'team1': {'name': games[0],'nickname': "",'img': None,'bgcolor': 'black','textcolor': 'white','rank': 0},"team2": {'name': games[1],'nickname': "", 'img': None,'bgcolor': 'black','textcolor': 'white','rank': 0},'id': id,'round': 0,'region': '00','started': 0,'score': {'team1Score': 0,'team2Score': 0}}
        dicts.append(gamesDict)
f.close()
print(dicts)
gamesDict = {'games': dicts}
jsdata += json.dumps(gamesDict)
fout = open('region-01.json', 'w')
fout.write(jsdata)
fout.close()