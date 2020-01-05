import docker
import os
import uuid
import shutil

form docker.errors import *

IMAGE_NAME = 'guoyanghg/coj-executor'
CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
TEMP_BUILD_DIR = '%s/tmp/' % CURRENT_DIR

SOURCE_FILE_NAMES = {
    'java': 'Example.java',
    'python': 'example.py'
}

BINARY_NAMES = {
    'java': 'Example',
    'python': 'example.py'
}

BUILD_COMMANDS = {
    'java': 'javac',
    'python': 'python'
}

EXECUTE_COMMANDS = {
    'java': 'java',
    'python': 'python'
}

client = docker.from_env()
def load_image():
    try:
        client.image.get(IMAGE_NAME)
    except ImageNotFound:
        print 'Image not found locally. Loading from Dockerhub..'
    except APIError:
        print 'Image not found locally, and Dockerhub is not accessible'
        return
    print 'Image [%s] loaded' % IMAGE_NAME

def build_and_run(code, lang):
    result = {'build':None, 'run': None, 'error': None}
    source_file_parent_dir = uuid.uuid4()
    source_file_host_dir = '%s/%s' % (TEMP_BUILD_DIR, source_file_parent_dir)
    source_file_guest_dir = '/test/%s' source_file_parent_dir
    make_dir(source_file_host_dir)

    with open('%s/%s' % (source_file_host_dir, SOURCE_FILE_NAMES[lang]), 'w') as source_file:
        source_file.write(code)
    try:
        client.containers.run(
            image=IMAGE_NAME,
            command = "%s %s" % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang])
            volumes = {source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}}
            working_dir = source_file_guest_dir
        )
        print 'source built'
    except ContainerError as e:
        print 'build falied'
        result['build'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result

    try:
        client.containers.run(
            image=IMAGE_NAME,
            command = "%s %s" % (EXECUTE_COMMANDS[lang], BINARY_NAMES[lang])
            volumes = {source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}}
            working_dir = source_file_guest_dir
        )
    except ContainerError as e:
        print 'Execution falied'
        result['run'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result

    shutil.rmtree(source_file_host_dir)
    return result

def make_dir(dir):
    try:
        os.mkdir(dir)
        print 'temp build dir[%s] created' % dir
    except OSError:
        print 'temp build dir[%s] exists' % dir

