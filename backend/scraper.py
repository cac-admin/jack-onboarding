from bs4 import BeautifulSoup
import requests
import sqlite3

con = sqlite3.connect('backend\db.sqlite3')
cur = con.cursor()
res = cur.execute('SELECT * FROM polls_courses')
print(res.fetchall())

url = 'https://www.cs.queensu.ca/undergraduate/courses/'
page = requests.get(url)
soup = BeautifulSoup(page.text, 'html')

courses = soup.find_all('li')
data = []
for thing in courses:
    code = thing.find_all('span', class_ ='code')
    title = thing.find_all('span', class_='title')
    description = thing.find_all('span', class_='description')
    if code != []:
        program, level  = code[0].contents[0].split(" ")
        code = code[0].contents[0]
        title = title[0].contents[0]
        description = description[0].contents[0]
        data.append(( description, level, program, title, code))
        cur.executemany("insert or ignore into polls_courses values (?, ?, ?, ?, ?)",data)
con.commit()
