import json

for region in range(0,2):
    rounds = []
    for rnd in range(0,1):
        fname = 'ff.txt'
        print(fname)
        with open(fname) as f:
            game = 0
            jsdata = ""
            dicts = []
            for line in f:
                id = 'ff'
                game += 2
                games = line.strip().split(',')
                gamesDict = {'team1': {'name': games[0],'nickname': "",'img': None,'bgcolor': 'black','textcolor': 'white','rank': 0},"team2": {'name': games[1],'nickname': "", 'img': None,'bgcolor': 'black','textcolor': 'white','rank': 0},'id': id,'round': 0,'region': '00','started': 0,'score': {'team1Score': 0,'team2Score': 0}}
                dicts.append(gamesDict)
        f.close()
        gamesDict = {'games': dicts}
        rounds.append(gamesDict)
    roundsDict = {'rounds': rounds}
    jsdata += json.dumps(roundsDict)
    outname = 'pff.json'
    print(outname)
    fout = open(outname, 'w')
    fout.write(jsdata)
    fout.close()


regions = ['00', '01', '10', '11']
for region in regions:
    rounds = []
    for rnd in range(0,4):
        fname = region + str(rnd) + '.txt'
        with open(fname) as f:
            game = 0
            jsdata = ""
            dicts = []
            for line in f:
                id = region + str(rnd) + str(game)
                game += 2
                games = line.strip().split(',')
                gamesDict = {'team1': {'name': games[0],'nickname': "",'img': None,'bgcolor': 'black','textcolor': 'white','rank': 0},"team2": {'name': games[1],'nickname': "", 'img': None,'bgcolor': 'black','textcolor': 'white','rank': 0},'id': id,'round': 0,'region': '00','started': 0,'score': {'team1Score': 0,'team2Score': 0}}
                dicts.append(gamesDict)
        f.close()
        gamesDict = {'games': dicts}
        rounds.append(gamesDict)
    roundDict = {'rounds': rounds}
    jsdata += json.dumps(roundDict)
    outname = 'p' + region + '.json'
    fout = open(outname, 'w')
    fout.write(jsdata)
    fout.close()