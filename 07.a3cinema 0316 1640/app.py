from pymongo import MongoClient
import requests
from bson import ObjectId
from bs4 import BeautifulSoup
from flask import Flask, render_template, request, jsonify
app = Flask(__name__)
client = MongoClient(
    'mongodb+srv://test:test@movies.ee2hkf8.mongodb.net/test')
db = client.dbsparta

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/popup')
def popup():
    return render_template('popup.html')

@app.route('/page2')
def page2():
    return render_template('page2.html')

@app.route('/popmovie/<int:i>')
def popmovie(i):
    return render_template('popmovie.html',num=i)

@app.route('/staff')
def staff():
    return render_template('staff.html')

@app.route('/bang')
def bang():
    return render_template('bang.html')

# 알바 지원하기, num값 post
@app.route("/movie", methods=["POST"])
def save_movie():
    movies = list(db.moviedb.find({}, {'_id': False}))
    count = len(movies) + 1
    imgurl_receive = request.form['imgurl_give']
    name_receive = request.form['name_give']
    age_receive = request.form['age_give']
    mbti_receive = request.form['mbti_give']
    hobby_receive = request.form['hobby_give']
    recommendmovie_receive = request.form['recommendmovie_give']
    goal_receive = request.form['goal_give']
    tmi_receive = request.form['tmi_give']

    doc = {
        'name': name_receive,
        'imgurl': imgurl_receive,
        'age': age_receive,
        'mbti': mbti_receive,
        'hobby': hobby_receive,
        'recommendmovie': recommendmovie_receive,
        'goal': goal_receive,
        'tmi': tmi_receive,
        'num':count
    }
    db.moviedb.insert_one(doc)
    return jsonify({'msg': '지원 완료!'})

# 알바 명단 get
@app.route("/movie", methods=["GET"])
def movie_get():
    movie_list = list(db.moviedb.find({}, {'_id': False}))
    return jsonify({'moviedb':movie_list})


# 팀원 밑에 코멘트 post
@app.route('/savecomment', methods=['POST'])
def savecomment():
   name_receive = request.form['name_give']
   comment_receive = request.form['comment_give']
   doc = {
       'name' : name_receive,
       'comment' : comment_receive,
   }
   db.comment.insert_one(doc)
   return jsonify({'msg': '등록완료!'})



# 팀원 밑에 코멘트 get
@app.route('/show_comment', methods=['GET'])
def show():
   comment = list(db.comment.find({},{'_id':False}))
   return jsonify({'show': comment})


# 팝업창 코멘트 post
@app.route('/popup_comment', methods=['POST'])
def popup_comment():
   name_receive = request.form['name_give']
   comment_receive = request.form['comment_give']
   doc = {
       'name' : name_receive,
       'comment' : comment_receive
   }
   db.popup_comment.insert_one(doc)
   return jsonify({'msg': '등록 완료'})

# 팝업창 댓글 get
@app.route('/show_popup_comment', methods=['GET'])
def show_popup_comment():
   show_popup_comment = list(db.popup_comment.find({},{'_id':False}))
   return jsonify({'show_popup': show_popup_comment})

# 팀 코멘트
@app.route('/show_all', methods=['GET'])
def show_all():
   show_all = list(db.comment.find({},{'_id':False}))
   return jsonify({'all_show': show_all})

# 영화 추천 크롤링 해오기 post
@app.route("/recommend", methods=["POST"])
def post_rec_movie():
    url_receive = request.form['url_give']
    comment_receive = request.form['comment_give']
    star_receive = request.form['star_give']

    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url_receive, headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    ogimage = soup.select_one('meta[property="og:image"]')['content']
    ogtitle = soup.select_one('meta[property="og:title"]')['content']
    
    
    doc = {
        'title':ogtitle,
        'image':ogimage,
        # 'url':url_receive,
        'star':star_receive,
        'comment':comment_receive
    }

    db.rec_movie.insert_one(doc)
    return jsonify({'msg':'저장 완료!'})

# 영화추천 리스팅 get
@app.route("/recommend", methods=["GET"])
def list_rec_movie():
    rec_movie_list = list(db.rec_movie.find({}, {'_id': False}))
    return jsonify({'rec_movie': rec_movie_list})

# 영화추천 상세페이지 팝업 get
@app.route("/recommend/<int:i>", methods=["GET"])
def get_rec_movie(i):
    rec_movie_list = list(db.rec_movie.find({}, {'_id': False}))[i]

    return jsonify({'rec_movie': rec_movie_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)

