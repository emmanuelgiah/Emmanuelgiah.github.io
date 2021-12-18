# import libraries.
import json
import time
import smtplib
import wikipedia
import progressbar
from random import randint
from twilio.rest import Client

# the client needs Twilio Account SID and Auth Token.
accountSID = "AC3657c84db6423f6006241ba131cd29f2"
authToken = "9de0c55877410e36049275528af92c7a"
toNumber = "+19402188390"
fromNumber = "+19402139061"
client = Client(accountSID, authToken)
#email data
gmail_user = 'giahbots@gmail.com'
gmail_password = 'hackmeplease123'

# arrays to store quotes and temporary data.
data = []
quotes = []

# create quote object.
class Quote:
    def __init__(self, text, author):
        self.text = text
        self.author = author

    def getQuote(self):
        format = "| " + self.text + " - " + self.author
        return format

# import json files and concatenate arrays with quote objects for every json pair.
# runtime O(4n)
with open('./quotes1.json') as file:
    data = json.load(file)['quotes']
for x in range(0, len(data)):
    quotes.append(Quote(data[x]['quote'], data[x]['author']))

with open('./quotes2.json') as file:
    data = json.load(file)
for x in range(0, len(data)):
    quotes.append(Quote(data[x]['text'], data[x]['from']))

with open('./quotes3.json') as file:
    data = json.load(file)
for x in range(0, len(data)):
    quotes.append(Quote(data[x]['text'], data[x]['author']))

with open('./quotes4.json') as file:
    data = json.load(file)
for x in range(0, len(data)):
    quotes.append(Quote(data[x]['quoteText'], data[x]['quoteAuthor']))

# user interface methods.
# space complexity O(1)
def getTimeInterval():
    time = int(input("\nhow often would you like to receive wisdom? (in minutes). "))
    return time

def getWikiChoice():
    wikiBool = input("would you like to know more about the speaker? (yes/no). ")
    if wikiBool[0].lower() == 'y':
        return True
    else:
        return False

# text methods.
def sendMessage(message):
    client.messages.create(to=toNumber, 
                       from_=fromNumber, 
                       body='\n'+message)

#email reminder of progress
def sendEmail(message):
    sent_from = gmail_user
    to = 'egiah769@gmail.com'

    try:
        smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        smtp_server.ehlo()
        smtp_server.login(gmail_user, gmail_password)
        smtp_server.sendmail(sent_from, to, message)
        smtp_server.close()
        print ("\nEmail sent successfully!")
    except Exception as ex:
        print ("\nSomething went wrong….",ex)

def buildMessage(wikiOption):
    index = randint(0, len(quotes))
    quote = quotes[index].getQuote()
    eligibleAuthor = False
    authorSegment = ""

    # error handling when wikipedia not found.
    # runtime bestcase: 0(  1) | worstcase: 0(n)
    while eligibleAuthor == False:
        try:
            authorSegment = '| ' + wikipedia.summary(quotes[index].author, sentences=4)
            eligibleAuthor = True
        except:
            del quotes[index]
            index = randint(0, len(quotes))
            quote = quotes[index].getQuote()
    
    # send message with optional wikipedia section.
    if wikiOption:
        wisdom = "| Your Dose of WSDM | \n"
        wisdom += "\n" + quote + "\n\n" + authorSegment + "\n"
        sendEmail(wisdom.encode('ascii', 'ignore').decode('ascii'))
    else:
        sendEmail(quote)

# create progress bar function.
# runtime O(n)
def animated_bar(interval):
    widgets = ['getting more wisdom... ', progressbar.AnimatedMarker()]
    bar = progressbar.ProgressBar(widgets=widgets).start()
      
    for i in range(interval):
        time.sleep(0.1)
        bar.update(i)
          
def main():
    # get the user entered time in interval.
    timeInterval = getTimeInterval() * 600
    infoBool = getWikiChoice()
    print();

    # send messages at a given time interval.
    while True:
        buildMessage(infoBool)
        
        # console feedback and loading animation.
        print(" | wisdom sent.\n")
        animated_bar(timeInterval)

if __name__ == "__main__":
    main();