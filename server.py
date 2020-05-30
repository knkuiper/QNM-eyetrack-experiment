import csv, json, os
from flask_cors import CORS
import pandas as pd
from flask import Flask, render_template, request, session, make_response

app = Flask(__name__, template_folder='pages', static_url_path='')
CORS(app, resources={r"/*": {"origins": "*"}})
app.secret_key = os.urandom(24)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/savegaze", methods=['POST'])
def savegaze():
    newdir = session.get('newdir', None)
    pd.DataFrame.from_dict(request.json).to_csv("participantsData/" + newdir + "/gazeData.csv", mode="a")

    return "OK"

@app.route("/saveclientspecs", methods=['POST'])
def saveclientspecs():
    newdir = session.get('newdir', None)
    clientSpecs = [["windH", "windW", "screenH", "screenW", "cond"]]
    specs = request.json

    clientSpecs.append(specs)

    # pd.DataFrame.from_dict(request.json).to_csv("participantsData/" + newdir + "/windSpecs.csv", mode="a")

    # condCountCSV = [["noimg", "img"], [noimgCount, imgCount]]
    with open("participantsData/" + newdir + "/windSpecs.csv", "w+", newline='') as my_csv:
         csvWriter = csv.writer(my_csv, delimiter=',')
         csvWriter.writerows(clientSpecs)

    return "OK"


# TODO
# Check wheter participant has experiment tab on active or not


# @app.route("/savequiz", methods=['POST'])
# def savequiz():
#     quizAnswers = request.json
#     newdir = session.get('newdir', None)
#
#     csvHeader = [["quizNr", "answer", "correct"]]
#     with open("participantsData/" + newdir + "/quizData.csv", "a") as my_csv:
#         csvWriter = csv.writer(my_csv, delimiter=',')
#         csvWriter.writerows(csvHeader)
#
#     with open("participantsData/" + newdir + "/quizData.csv", "a") as my_csv:
#         csvWriter = csv.writer(my_csv, delimiter=',')
#         csvWriter.writerows(quizAnswers)
#     return "OK"


@app.route("/", methods=['GET'])
def index1():
    with open('condCounter.csv', newline='') as f:
        reader = csv.reader(f)
        data = list(reader)
    print(data)
    cond = 0
    imgCount = int(data[1][1])
    noimgCount = int(data[1][0])

    if (int(data[1][0]) > int(data[1][1])):
        imgCount += 1
        cond = 1
    else:
        noimgCount += 1
        cond = 0

    condCountCSV = [["noimg", "img"], [noimgCount, imgCount]]
    with open("condCounter.csv", "w+",  newline='') as my_csv:
        csvWriter = csv.writer(my_csv, delimiter=',')
        csvWriter.writerows(condCountCSV)

    path = "participantsData"
    subdirs = os.listdir(path).__len__()
    newdir = str(subdirs + 1)
    session['newdir'] = newdir
    os.mkdir("participantsData/" + newdir)

    return render_template("index.html", cond=cond, partID = newdir)


@app.route("/test", methods=['GET'])
def index2():
    path = "participantsData"
    subdirs = os.listdir(path).__len__()
    newdir = str(subdirs + 1)
    session['newdir'] = newdir
    os.mkdir("participantsData/" + newdir)

    return render_template("index.html")

# @app.route('/.well-known/acme-challenge/<challenge>')
# def letsencrypt_check(challenge):
#     # challenge_response = {
#     #     "<challenge_token>":"<challenge_response>",
#     #     "<challenge_token>":"<challenge_response>"
#     # }
#     return render_template(challenge)

if __name__ == "__main__":
     context = ('/etc/letsencrypt/live/qhcirm-exp.xyz/cert.pem', '/etc/letsencrypt/live/qhcirm-exp.xyz/privkey.pem')
     app.run(host='0.0.0.0', port=443, debug=True, ssl_context=context)
    # app.run(host='0.0.0.0', port=5000, debug=True)

