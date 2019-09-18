json.text @chat.text
json.image @chat.image.url
json.name @chat.user.name
json.created_at @chat.created_at.strftime("%Y/%m/%d %H:%M")
json.id @chat.id