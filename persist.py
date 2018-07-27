import os
import uuid

import redis


class RedisPersistService():
    PROJECT_NAME = 'eoi'

    def __init__(self):
        self.client = redis.from_url(
            os.environ.get('REDIS_URL'),
            decode_responses=True)

    def create(self, resource, data):
        resource_id = self.generate_id()
        self.client.hmset(
            self.get_resource_key(resource, resource_id),
            data)

    def update(self, resource, data, resource_id):
        index = self.get_resource_key(resource, resource_id)
        self.client.hmset(index, data)
        return self.client.hgetall(index)

    def get(self, resource, resource_id):
        index = self.get_resource_key(resource, resource_id)
        return self.client.hgetall(index)

    def delete(self, resource, resource_id):
        self.client.hdel(self.get_resource_key(resource, resource_id))

    def get_list(self, resource):
        item_list = []
        item_keys = self.client.keys(
            self.get_resource_key(resource, '*'))

        for key in item_keys:
            item_data = self.client.hgetall(key)
            item_data['id'] = key
            item_list.append(item_data)

        return item_list

    def get_resource_key(self, resource, resource_id):
        return '{}:{}:{}'.format(self.PROJECT_NAME, resource, resource_id)

    def generate_id(self):
        return str(uuid.uuid4())
