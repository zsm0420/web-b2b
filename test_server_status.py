import urllib.request
import urllib.error
import urllib.parse

print("=== 检查服务器状态 ===")

# 测试各个页面
pages = [
    ('/', '首页'),
    ('/about', '关于我们'),
    ('/contact', '联系我们'),
    ('/faq', '常见问题'),
    ('/download', '下载页面'),
    ('/product', '产品中心'),
    ('/news', '新闻页面'),
    ('/case', '案例页面'),
    ('/test', '测试页面')
]

for path, name in pages:
    try:
        # 构建完整的URL
        url = f'http://localhost:3001{path}'
        request = urllib.request.Request(url)
        request.add_header('User-Agent', 'Mozilla/5.0 (compatible; Server Status Checker)')
        
        # 不跟随重定向，获取原始响应状态
        response = urllib.request.urlopen(request, timeout=10)
        print(f'{name}页面 ({path}): 状态 {response.status} ✓')
    except urllib.error.HTTPError as e:
        if e.code == 308:  # 永久重定向 - 这通常表示页面存在但需要重定向
            print(f'{name}页面 ({path}): 状态 308 (重定向) ⚠')
        elif e.code >= 500:
            print(f'{name}页面 ({path}): 状态 {e.code} (服务器错误) ✗')
            try:
                error_body = e.read().decode('utf-8')
                if 'Error:' in error_body:
                    import re
                    errors = re.findall(r'Error:[^\n]+', error_body)
                    for error in errors[:2]:  # 只显示前2个错误
                        print(f'  错误: {error.strip()}')
            except:
                pass
        else:
            print(f'{name}页面 ({path}): 状态 {e.code} ✗')
    except urllib.error.URLError as e:
        if 'timed out' in str(e):
            print(f'{name}页面 ({path}): 超时 ✗ (服务器可能未启动)')
        else:
            print(f'{name}页面 ({path}): N/A ✗ ({type(e).__name__}: {str(e)})')
    except Exception as e:
        print(f'{name}页面 ({path}): N/A ✗ ({type(e).__name__}: {str(e)})')

print("\n=== Django服务器状态 ===")
try:
    response = urllib.request.urlopen('http://127.0.0.1:8000', timeout=5)
    print(f'Django服务器状态: {response.status} ✓')
except urllib.error.URLError as e:
    print(f'Django服务器状态: N/A ✗ ({type(e).__name__}: {str(e)})')
except Exception as e:
    print(f'Django服务器状态: N/A ✗ ({type(e).__name__}: {str(e)})')