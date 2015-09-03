__author__ = 'shaked'

import itertools

from dateutil.parser import parse
from flask import Blueprint, jsonify, request, g
from mongoengine import Q
import os

from models.all import *

class GeneralController(Blueprint):

    def getUserInfo(self):
      """
      Returns the User info for the currently logged in User.
      If the User is active, the list of Debts are returned as well.
      """
      users = User.objects().all()

      return [user.toMinimalJson() for user in users]

    def handleFacebookLogin(self, facebook_id, name, location, address, friends_list, access_token, email):
      user = User.objects(facebook_id=facebook_id).get()
      if user:
        user.current_location = location
        user.address = address
        user.friend_list = friends_list
        user.access_token = access_token
        user.email = email
        user.save()
      else:
        user = User(facebook_id=facebook_id, name=name, current_location=location,
                    address=address, friends_list=friends_list, access_token=access_token,
                    email=email)
        user.save()

      return "Successfully Logged In."


    def getUserWishList(self, facebook_id):
      user = User.objects(facebook_id=facebook_id).get()
      return user.wish_list

    def handleAddToWishList(self, facebook_id, location, product):
      user = User.objects(facebook_id=facebook_id).get()
      q = Query()
      q.addToWishList(user, WishItem(location,product))
      return self.getUserWishList(facebook_id)


ctrl = GeneralController("general", __name__, static_folder="../public")

# Signal handlers.
# @login_service.new_session.connect_via(login_service)
# def handle_new_session(login_service, login, role, **extras):
#   if role == Login.Role.USER:
#     ctrl.createNewWebCommunication(login.user, request.args.get("ref"))

@ctrl.route("/")
def user_path():
    #return ctrl.send_static_file(os.path.join(os.getcwd(), "public", "app", "index.html"))
    return ctrl.send_static_file("app/index.html")

@ctrl.route("/api/user/info/")
def get_user_info():
  info = ctrl.getUserInfo()
  if not info:
    return jsonify(err=("No user found for ID: '%s'" % g.user.user_id))
  return jsonify(info=info)

@ctrl.route("/api/user/login/", methods=["POST"])
def login_user():
  facebook_id = request.form.get("facebookId")
  name = request.form.get("name")
  location = request.form.get("currentLocation")
  address = request.form.get("address")
  friends_list = request.form.get("friendsList")
  access_token = request.form.get("accessToken")
  email = request.form.get("email")

  result = ctrl.handleFacebookLogin(facebook_id, name, location, address, friends_list, access_token, email)
  return jsonify(result=result)

@ctrl.route("/add_to_wishlist", methods=["POST"])
def add_to_wishlist():
    product = request.form.get("product")
    location = request.form.get("location")
    facebook_id = request.form.get("fb_id")
    result = ctrl.handleAddToWishList(facebook_id, location, product)
    return jsonify(result=result)

@ctrl.route("/get_wishlist/<fb_id>")
def get_to_wishlist(fb_id):
    result = ctrl.getUserWishList(fb_id)
    return jsonify(result=result)