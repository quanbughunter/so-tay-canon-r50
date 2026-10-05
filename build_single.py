import re, base64, pathlib
root = pathlib.Path(__file__).parent
html = (root/'index.html').read_text(encoding='utf-8')
css = (root/'css/style.css').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="css/style.css">', f'<style>\n{css}\n</style>')
def inline(m):
    js = (root/m.group(1)).read_text(encoding='utf-8')
    def img(x):
        f = root/'assets/real'/x.group(1)
        return 'data:image/jpeg;base64,'+base64.b64encode(f.read_bytes()).decode() if f.exists() else x.group(0)
    js = re.sub(r"assets/real/([\w\-]+\.jpg)", img, js)
    return f'<script>\n{js}\n</script>'
html = re.sub(r'<script src="(js/[\w\-]+\.js)"></script>', inline, html)
out = root/'dist'; out.mkdir(exist_ok=True)
(out/'so-tay-canon-r50-mot-file.html').write_text(html, encoding='utf-8')
print(len(html)//1024, 'KB')
