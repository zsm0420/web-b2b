#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request
import urllib.error
import ssl

def test_page(url, name):
    print(f"测试 {name}...")
    try:
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })

        with urllib.request.urlopen(req, timeout=15, context=ssl_context) as response:
            status = response.getcode()
            content = response.read().decode('utf-8')
            print(f"  状态码: {status}")
            if status == 200:
                print(f"  ✓ 页面加载成功")
                print(f"  内容长度: {len(content)} 字符")
                if 'Products' in content or '产品' in content or '<html' in content:
                    print(f"  ✓ 包含预期内容")
                    return True
                else:
                    print(f"  ? 内容可能不完整")
            else:
                print(f"  ✗ 非200状态码")
                if len(content) > 0:
                    print(f"  错误内容前200字符:")
                    print(f"  {content[:200]}...")
            return False
    except Exception as e:
        print(f"  ✗ 连接失败: {type(e).__name__}: {str(e)}")
        return False

def main():
    print("=== 测试修复后的产品页面 ===")

    # 测试产品页面
    test_page('http://localhost:3000/product/', '产品中心')

    print("\n=== 测试完成 ===")

if __name__ == '__main__':
    main()