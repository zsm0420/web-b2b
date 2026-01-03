#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request
import urllib.error
import ssl

def get_error_details(url):
    try:
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

        with urllib.request.urlopen(req, timeout=10, context=ssl_context) as response:
            content = response.read().decode('utf-8')
            print(f"状态码: {response.getcode()}")
            print(f"内容长度: {len(content)}")
            if len(content) > 0:
                print(f"前500字符:")
                print(content[:500])
                if content[:100].find('error') != -1 or content[:100].find('Error') != -1:
                    print("  → 发现错误信息")
            return content
    except urllib.error.HTTPError as e:
        if hasattr(e, 'read'):
            error_body = e.read().decode('utf-8')
            print(f"HTTP错误 {e.code}:")
            print(f"错误内容前1000字符:")
            print(error_body[:1000])
            return error_body
        else:
            print(f"HTTP错误 {e.code} (无内容)")
            return ""
    except Exception as e:
        print(f"请求失败: {type(e).__name__}: {str(e)}")
        return ""

if __name__ == '__main__':
    print("=== 获取产品页面错误详情 ===")
    get_error_details('http://localhost:3001/product/')
    print("\n=== 完成 ===")