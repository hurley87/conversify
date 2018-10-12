import pymongo

client = pymongo.MongoClient('mongodb://growthgenius:growthgenius2018@ds263791.mlab.com:63791/test_growth')
db = client['test_growth']

collection_names = ["q4launch", "berlin", "hurls", "icm_hub", "liam", "rietano", 'riipen', 'worktango']

db["mother"].remove({})
for name in collection_names:
    for item in db[name].find({}):
        del item["_id"]
        if "supernova_personalization.1" in item:
            del item['supernova_personalization.1']
        item['account_owner'] = name
        db["mother"].insert(item)