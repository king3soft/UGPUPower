import os
import shutil
import subprocess
from miniperf import adb_helper
from loguru import logger

ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
GPU_POWER_PATH = os.path.join(ROOT_DIR, "asserts\\gpu_power")
GPU_POWER_NAME = "gpu_power"
class Api:
    def __init__(self):
        self.cleanDir()

    def cleanDir(self):
        shutil.rmtree('data', ignore_errors=True)
        os.mkdir('data')

    def getDevices(self):
        devices = adb_helper.get_devices()
        return  {'code': 200, 'data': { 'devices': devices }, 'message': f''}
    
    def getPackages(self, serial):
        logger.info('{}', serial)
        if serial:
            packages = adb_helper.get_packages(serial)
            return  {'code': 200, 'data': { 'packages': packages }, 'message': f''}
        else:
            raise Exception('Device not found')

    def startCapture(self):
        cmd = f'adb push {GPU_POWER_PATH} /data/local/tmp'
        output = subprocess.check_output(cmd, shell=False)
        logger.info("{}", output)

        try:
            cmd = f'adb shell su -c "kill $(pidof {GPU_POWER_NAME})"'
            output = subprocess.check_output(cmd, shell=False, stderr=subprocess.STDOUT).decode('utf-8').strip()
        except subprocess.CalledProcessError as e:
            logger.error("not found target process. err:{}", e.output)
            # raise Exception(e.output)
        
        try:
            cmd = f'adb shell chmod +x /data/local/tmp/{GPU_POWER_NAME}'            
            output = subprocess.check_output(cmd, shell=False, stderr=subprocess.STDOUT).decode('utf-8').strip()
            logger.info("{}", output)
        except subprocess.CalledProcessError as e:
            logger.error("Excption. cmd:{} err:{}", cmd, e.output)
            raise Exception(e.output)

        try:
            cmd = f'adb shell su -c "/data/local/tmp/{GPU_POWER_NAME}"'
            output = subprocess.check_output(cmd, shell=False, stderr=subprocess.STDOUT).decode('utf-8').strip()
            logger.info("{}", output)
        except subprocess.CalledProcessError as e:
            logger.error("Excption. cmd:{} err:{}", cmd, e.output)
            raise Exception(e.output)
        
        try:
            cmd = f'adb shell pidof {GPU_POWER_NAME}'
            output = subprocess.check_output(cmd, shell=False, stderr=subprocess.STDOUT).decode('utf-8').strip()
            logger.info("{}", output)
        except subprocess.CalledProcessError as e:
            logger.error("Excption. cmd:{} err:{}", cmd, e.output)
            # raise Exception(e.output)
        
        # logger.info("{}", output)
        ip = adb_helper.get_ip(None)
        return  {'code': 200, 'data': { 'ip': ip, 'output': output, 'err': ""}, 'message': f''}
        
        # try:
        #     cmd = f'adb shell /data/local/tmp/{GPU_POWER_NAME}'
        #     print(cmd)
        #     process  = subprocess.Popen(cmd, shell=False, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        #     output, err = process.communicate()
        #     logger.info('output: {} err:{}', output, err)
        #     s_output = output.decode('utf-8').strip()
        #     s_err = err.decode('utf-8').strip()
        # except subprocess.CalledProcessError as e:
        #     return {'code': 200, 'data': { 'output': '', 'err': s_err}, 'message': f''}
        # return  {'code': 200, 'data': { 'output': s_output, 'err': s_err}, 'message': f''}

    def error(self):
        raise Exception('This is a Python exception')