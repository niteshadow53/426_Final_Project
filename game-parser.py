import json

for region in range(0,1):
    rounds = []
    for rnd in range(0,2):
        fname = 'ff' + str(rnd) + '.txt'
        print(fname)
        with open(fname) as f:
            game = 0
            jsdata = ""
            dicts = []
            for line in f:
                id = 'ff' + str(rnd) + str(game)
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


