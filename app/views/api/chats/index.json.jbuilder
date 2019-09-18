json.array! @chats do |chat|
  json.text chat.text
  json.image chat.image.url
  json.created_at chat.created_at.strftime("%Y/%m/%d %H:%M")
  json.name chat.user.name
  json.id chat.id
end