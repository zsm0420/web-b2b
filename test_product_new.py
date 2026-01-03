#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request
import urllib.error
import ssl

def test_page(url, page_name):
    try:
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

        with urllib.request.urlopen(req, timeout=10, context=ssl_context) as response:
            status = response.getcode()
            content = response.read().decode('utf-8')
            if status == 200:
                print(f'{page_name}页面状态: 200 ✓')
                # 检查是否包含基本内容
                if 'Products' in content or '产品' in content:
                    print(f'  → 内容正确加载')
                else:
                    print(f'  → 页面加载但内容可能不完整')
                return True
            else:
                print(f'{page_name}页面状态: {status} ✗')
                if 'error' in content[:200].lower():
                    print(f'  → 发现错误信息')
                return False
    except urllib.error.HTTPError as e:
        if hasattr(e, 'read'):
            error_body = e.read().decode('utf-8')
            print(f'{page_name}页面状态: {e.code} ✗')
            print(f'  → 错误详情: {error_body[:300]}...')
        else:
            print(f'{page_name}页面状态: {e.code} ✗ (无法获取错误详情)')
        return False
    except Exception as e:
        print(f'{page_name}页面状态: N/A ✗ ({type(e).__name__}: {str(e)})')
        return False

def main():
    print("=== 测试产品相关页面 (端口3000) ===")

    # 测试基础产品页面
    test_page('http://localhost:3000/product/', '产品中心首页')

    # 测试产品分类页面
    test_page('http://localhost:3000/product/category/1', '产品分类1')
    test_page('http://localhost:3000/product/category/1/page/1', '产品分类1第1页')

    # 测试产品分页
    test_page('http://localhost:3000/product/page/1', '产品第1页')
    test_page('http://localhost:3000/product/page/2', '产品第2页')

    # 测试搜索
    test_page('http://localhost:3000/product/?s=test', '产品搜索')

    print("\n=== 测试完成 ===")

if __name__ == '__main__':
    main()