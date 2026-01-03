#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request
import urllib.error
import ssl
import json

def test_page(url, page_name):
    try:
        # 创建SSL上下文
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        # 发送请求
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

        with urllib.request.urlopen(req, timeout=10, context=ssl_context) as response:
            status = response.getcode()
            if status == 200:
                print(f'{page_name}页面状态: 200 ✓')
                return True
            else:
                print(f'{page_name}页面状态: {status} ✗')
                return False
    except urllib.error.HTTPError as e:
        if hasattr(e, 'read'):
            try:
                error_body = e.read().decode('utf-8')
                print(f'{page_name}页面状态: {e.code} ✗')
                # 检查是否是500错误
                if '500' in str(e.code):
                    print(f'  → 500内部服务器错误，需要修复')
                print(f'  → 错误详情: {error_body[:200]}...')
            except:
                print(f'{page_name}页面状态: {e.code} ✗ (无法获取错误详情)')
        else:
            print(f'{page_name}页面状态: {e.code} ✗ (无法获取错误详情)')
        return False
    except Exception as e:
        print(f'{page_name}页面状态: N/A ✗ ({type(e).__name__}: {str(e)})')
        return False

def main():
    print("=== 测试产品相关页面 ===")

    # 测试基础产品页面
    test_page('http://localhost:3001/product/', '产品中心首页')

    # 测试产品分类页面
    test_page('http://localhost:3001/product/category/1', '产品分类1')
    test_page('http://localhost:3001/product/category/1/page/1', '产品分类1第1页')

    # 测试产品分页
    test_page('http://localhost:3001/product/page/1', '产品第1页')
    test_page('http://localhost:3001/product/page/2', '产品第2页')

    # 测试搜索
    test_page('http://localhost:3001/product/?s=test', '产品搜索')

    print("\n=== 测试完成 ===")

if __name__ == '__main__':
    main()