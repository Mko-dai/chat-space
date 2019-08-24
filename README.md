# README

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|

### Association
- has_many :members 
- has_many :users, through: :members
- has_many :chats

## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :chats
- has_many :members, 
- has_many :groups, through: :members

## chatsテーブル
|Column|Type|Option|
|------|----|------|
|text|text||
|image|text||
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group