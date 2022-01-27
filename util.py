from flask import request, jsonify, render_template


def get_data(name):
    if request.is_json:
        return request.json.get(name)
    return request.values.get(name)


def render(template, data):
    if request.is_json:
        return jsonify(data)
    return render_template(template, data=data)
