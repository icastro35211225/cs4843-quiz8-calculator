import json
from google.cloud import pubsub_v1

publisher = pubsub_v1.PublisherClient()

def calc(request):
  
  headers = { 'Access-Control-Allow-Origin': '*' }

  if request.args and "operation" in request.args:
    if "data1" in request.args:
      data1 = float(request.args.get("data1"))
    if "data2" in request.args:
      data2 = float(request.args.get("data2"))
    oper = request.args.get("operation")
    if oper == "add":
      return (str(data1 + data2), 200, headers)
    elif oper == "sub":
      return (str(data1 - data2), 200, headers)
    elif oper == "mul":
      return (str(data1 * data2), 200, headers)
    elif oper == "div":
      if data2 == 0.0:
        return ("Div by Zero!", 200, headers)
      else:
        return (str(data1 / data2), 200, headers)
  elif "publish" in request.args:
    topic_name = 'quiz8-calc-topic'
    porject_id = 'oow237Quiz8'
    message = 'published!'

    topic_path = publisher.topic_path(porject_id, topic_name)
    message_json = json.dumps({
      'data': {'result': message},
    })

    message_bytes = message_json.encode('utf-8')

    try:
      publish_future = publisher.publish(topic_path, data=message_bytes)
      publish_future.result()
      return ("Result published", 200, headers)
    except Exception as e:
      print(e)
      return (str(e), 500, headers)
  elif not "operation" in request.args:
    return ("No operation!", 200, headers)
