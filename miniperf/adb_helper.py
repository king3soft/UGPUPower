import os
import re
import subprocess
from loguru import logger

def get_ip(serial):
    command = ["adb", "shell", "ip", "route"]
    result = subprocess.check_output(command).decode("utf-8").strip()
    ip = result.split(" ")[-1]
    logger.info('ip: {}', ip)
    return ip



def get_devices():
    ''' 获取设备列表 '''
    out = subprocess.check_output('adb devices').decode('utf-8').strip()
    devices = re.findall(r'(.*?)\s+device', out)
    if len(devices) > 1:
        return devices[1:]
    else:
        return []


def get_packages(serial):
    ''' 获取应用列表 '''
    out = subprocess.check_output(f'adb -s {serial} shell pm list packages -3', shell=False).decode('utf-8')
    out = out.splitlines()
    pattern = "^package:(.*?)\r?$"

    package = []
    for p in out:
        m = re.match(pattern, p)
        if m:
            package.append(m.group(1))
    return package