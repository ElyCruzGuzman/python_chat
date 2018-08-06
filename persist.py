import os
import uuid

import redis


class RedisPersistService():
    PROJECT_NAME = 'eoi'

    def __init__(self):
        self.client = redis.StrictRedis(
            host='database',
            decode_responses=True)

    def create(self, resource, data):
        resource_id = self.generate_id()

        self.client.hmset(
            self.get_resource_key(resource, resource_id),
            data)

    def create_list(self, resource, data, resource_id):
        self.client.lpush(
            self.get_resource_key(resource, resource_id), data)
        return data

    def get_resource_as_list(self, resource, resource_id):
        return self.client.lrange(
            self.get_resource_key(resource, resource_id), 0, 100000)

    def update(self, resource, data, resource_id):
        index = self.get_resource_key(resource, resource_id)
        self.client.hmset(index, data)
        return self.client.hgetall(index)

    def get(self, resource, resource_id):
        index = self.get_resource_key(resource, resource_id)
        return self.client.hgetall(index)

    def delete(self, resource, resource_id):
        self.client.hdel(self.get_resource_key(resource, resource_id))

    def get_list(self, resource, query_filter=None):
        resource_list = []
        resource_keys = self.client.keys(
            self.get_resource_key(resource, '*'))

        for key in resource_keys:
            resource_data = self.client.hgetall(key)
            resource_data['id'] = key.split(':')[-1]

            if self.matches_filter(resource_data, query_filter):
                resource_list.append(resource_data)

        return resource_list

    def matches_filter(self, resource_data, query_filter):
        matches = True

        if not query_filter:
            return matches

        for key, query in query_filter.items():
            if resource_data[key] != query:
                return False

        return matches

    def get_resource_key(self, resource, resource_id):
        return '{}:{}:{}'.format(self.PROJECT_NAME, resource, resource_id)

    def generate_id(self):
        return str(uuid.uuid4())
