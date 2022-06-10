import certifi

#algorithme de recommendation : 

#cherches le type de catégorie/tags que le users aime grace a ce qu'il a déja vu/ce qu'il a aimé. Question a la création du compte ? 
# sinon premier affichage avec le classement des films selon les notes que le site a déja

#on peut creer deux dictionnaires avec l'ensemble des catégories et tags des films qu'il a vu :
#les valeurs/ catégories sont les clés (sont présentes que ceeux des films que l'utilsateuurice a vu) et en valeurs asssocié on peu mettre la somme des notes que l'utilsateur a mis dans chacun 
#puis on fait une liste de tag classé par importance et on retoirne les films comme ca : coeff importance films catégories ?

import pymongo
from pymongo import MongoClient 
client=MongoClient('mongodb://group8:ShwVybC932ftgqRN@cs2022.lmichelin.fr:27017/group8?ssl=true', tlsCAFile=certifi.where())

db = client.group8
movies = db.movies
ratings=db.ratings

import pprint


for movie in movies.find():
    print(movie['title'],movie['tags'])



def score_tags(user_id):
    score={}
    for rating in ratings.find({"_id":user_id}):
        movie_id=rating[movie_id]
        note=rating[note]
        movie=movies.find_one({"_id":movie_id})
        tags=movie[tags]
        for tag in tags:
            if tag in score :
                score[tag]=score[tag]+note
            else:
                score[tag]=(note)
    return score
    
def ordre_tags(score):
    classement=[]
    n=len(score)
    for i in range (n):
        max=0
        for tag in (score):
            if score[tag]>max:
                max=score[tag]
                tag_max=tag
        classement.append[tag_max]
        del score[tag_max]
    return classement

def recommandation_content_simple(classement):
    movie_in={}
    for movie in movies.find():
        movie_in[movie['_id']]=False
    rec=[]
    for tag in classement:
        for movie in movies.find():
            if tag in movie['tags'] and not movie_in[movie['_id']]:
                rec.append(movie['_id'])
                movie_in[movie['_id']]=True
    for movie in movies.find():
        if not movie_in[movie['_id']]:
            rec.append[movie['_id']]
    return(rec)


def rangement_film(classement):
    rangement={}
    for tag in classement:
        rangement[tag]=[]
    for movie in movies.find():
        for tag in movie["tags"]:
            if tag in classement:
                rangement[tag].append(movie["_id"])
    return rangement

def recommandation_content_simple2(classement):
    movie_in={}
    rec=[]
    for movie in movies.find():
        movie_in[movie['_id']]=False
    rangement=rangement_film(classement)
    for tag in rangement:
        for movie_id in rangement[tag]:
            if not movie_in[movie_id]:
                rec.append(movie_id)
    for movie in movies.find():
        if not movie_in[movie['_id']]:
            rec.append(movie['_id'])
    return rec

            

score=score_tags('62a0a80e225718d475c4e83d')
classement=ordre_tags(score)
rec=recommandation_content_simple2(classement)
print(rec)
print(score)