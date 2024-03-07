import os
import webview
from miniperf import api
ROOT_DIR = os.path.abspath(os.path.dirname(__file__))

def on_loaded():    
    # unsubscribe event listener
    webview.windows[0].events.loaded -= on_loaded
    webview.windows[0].evaluate_js(r"""
    window.isDevelopment = false;
    """)

def main():
    window = webview.create_window('UGPUPower', os.path.join(ROOT_DIR, "ui", "dist", "index.html"), width=1024, height=768, js_api=api.Api(), resizable=False)
    window.events.loaded += on_loaded 
    webview.start(user_agent='Chrome', debug=True)

if __name__ == '__main__':
    main()