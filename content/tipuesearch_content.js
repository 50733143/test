var tipuesearch = {"pages": [{'title': '簡介', 'text': 'CMSimfly ( https://github.com/chiamingyen/cmsimfly)  是一套簡單的網際內容管理系統, 採用 Flask 網際框架, 以 Beautifulsoup 解讀分頁內容. \n \n \n', 'tags': '', 'url': '簡介.html'}, {'title': '目錄結構', 'text': 'CMSimfly 的動態系統採用 Python3 + Flask 建構, 並且利用 Beatifulsoup 解讀位於 contig 目錄中的 content.htm 超文件檔案. \n content.htm 檔案可以透過動態系統中的 generate_pages 功能, 將超文件轉為位於 content 目錄中的個別頁面檔案. \n 動態系統與靜態系統則共用 downloads, images, static 等目錄, 其中 downloads 目錄存放在動態系統上傳的文件檔, 而 images 目錄則存放動態系統所上傳的影像檔案, 包括 jpg, png 與 gif 等格式圖檔. \n static 目錄則存放在動態與靜態系統所需要的 Javascript 或 Brython 程式檔. \n', 'tags': '', 'url': '目錄結構.html'}, {'title': '頁面編輯', 'text': 'CMSimfly 動態系統的網際編輯器採用  TinyMCE4 , 可以放入一般超文件,\xa0 納入圖檔, 嵌入影片連結, 並且加入帶有行數的原始碼. \n 透過 File Upload 功能, 可以一次上傳多個檔案,\xa0 存入 downloads 目錄中儲存, 之後各頁面可以引入對應連結. \n 而圖檔的上傳與引用與一般檔案類似, 但上傳後存入 images 目錄中. \n', 'tags': '', 'url': '頁面編輯.html'}, {'title': '插入程式碼', 'text': 'CMSimfly 目前使用 Syntaxhighlighter 3.0.83: \n \xa0 http://alexgorbatchev.com/SyntaxHighlighter/ \xa0 \n 進行頁面中的程式碼高亮顯示. \n Java 程式碼 \n import java.util.Scanner;\n\npublic class Life {\n    public static void show(boolean[][] grid){\n        String s = "";\n        for(boolean[] row : grid){\n            for(boolean val : row)\n                if(val)\n                    s += "*";\n                else\n                    s += ".";\n            s += "\\n";\n        }\n        System.out.println(s);\n    }\n    \n    public static boolean[][] gen(){\n        boolean[][] grid = new boolean[10][10];\n        for(int r = 0; r < 10; r++)\n            for(int c = 0; c < 10; c++)\n                if( Math.random() > 0.7 )\n                    grid[r][c] = true;\n        return grid;\n    }\n    \n    public static void main(String[] args){\n        boolean[][] world = gen();\n        show(world);\n        System.out.println();\n        world = nextGen(world);\n        show(world);\n        Scanner s = new Scanner(System.in);\n        while(s.nextLine().length() == 0){\n            System.out.println();\n            world = nextGen(world);\n            show(world);\n            \n        }\n    }\n    \n    public static boolean[][] nextGen(boolean[][] world){\n        boolean[][] newWorld \n            = new boolean[world.length][world[0].length];\n        int num;\n        for(int r = 0; r < world.length; r++){\n            for(int c = 0; c < world[0].length; c++){\n                num = numNeighbors(world, r, c);\n                if( occupiedNext(num, world[r][c]) )\n                    newWorld[r][c] = true;\n            }\n        }\n        return newWorld;\n    }\n    \n    public static boolean occupiedNext(int numNeighbors, boolean occupied){\n        if( occupied && (numNeighbors == 2 || numNeighbors == 3))\n            return true;\n        else if (!occupied && numNeighbors == 3)\n            return true;\n        else\n            return false;\n    }\n\n    private static int numNeighbors(boolean[][] world, int row, int col) {\n        int num = world[row][col] ? -1 : 0;\n        for(int r = row - 1; r <= row + 1; r++)\n            for(int c = col - 1; c <= col + 1; c++)\n                if( inbounds(world, r, c) && world[r][c] )\n                    num++;\n\n        return num;\n    }\n\n    private static boolean inbounds(boolean[][] world, int r, int c) {\n        return r >= 0 && r < world.length && c >= 0 &&\n        c < world[0].length;\n    }\n\n} \n \n Python 程式碼 \n def parse_content():\n    """use bs4 and re module functions to parse content.htm"""\n    #from pybean import Store, SQLiteWriter\n    # if no content.db, create database file with cms table\n    \'\'\'\n    if not os.path.isfile(config_dir+"content.db"):\n        library = Store(SQLiteWriter(config_dir+"content.db", frozen=False))\n        cms = library.new("cms")\n        cms.follow = 0\n        cms.title = "head 1"\n        cms.content = "content 1"\n        cms.memo = "first memo"\n        library.save(cms)\n        library.commit()\n    \'\'\'\n    # if no content.htm, generate a head 1 and content 1 file\n    if not os.path.isfile(config_dir+"content.htm"):\n        # create content.htm if there is no content.htm\n        File = open(config_dir + "content.htm", "w", encoding="utf-8")\n        File.write("<h1>head 1</h1>content 1")\n        File.close()\n    subject = file_get_contents(config_dir+"content.htm")\n    # deal with content without content\n    if subject == "":\n        # create content.htm if there is no content.htm\n        File = open(config_dir + "content.htm", "w", encoding="utf-8")\n        File.write("<h1>head 1</h1>content 1")\n        File.close()\n        subject = "<h1>head 1</h1>content 1"\n    # initialize the return lists\n    head_list = []\n    level_list = []\n    page_list = []\n    # make the soup out of the html content\n    soup = bs4.BeautifulSoup(subject, \'html.parser\')\n    # 嘗試解讀各種情況下的標題\n    soup = _remove_h123_attrs(soup)\n    # 改寫 content.htm 後重新取 subject\n    with open(config_dir + "content.htm", "wb") as f:\n        f.write(soup.encode("utf-8"))\n    subject = file_get_contents(config_dir+"content.htm")\n    # get all h1, h2, h3 tags into list\n    htag= soup.find_all([\'h1\', \'h2\', \'h3\'])\n    n = len(htag)\n    # get the page content to split subject using each h tag\n    temp_data = subject.split(str(htag[0]))\n    if len(temp_data) > 2:\n        subject = str(htag[0]).join(temp_data[1:])\n    else:\n        subject = temp_data[1]\n    if n >1:\n            # i from 1 to i-1\n            for i in range(1, len(htag)):\n                head_list.append(htag[i-1].text.strip())\n                # use name attribute of h* tag to get h1, h2 or h3\n                # the number of h1, h2 or h3 is the level of page menu\n                level_list.append(htag[i-1].name[1])\n                temp_data = subject.split(str(htag[i]))\n                if len(temp_data) > 2:\n                    subject = str(htag[i]).join(temp_data[1:])\n                else:\n                    subject = temp_data[1]\n                # cut the other page content out of htag from 1 to i-1\n                cut = temp_data[0]\n                # add the page content\n                page_list.append(cut)\n    # last i\n    # add the last page title\n    head_list.append(htag[n-1].text.strip())\n    # add the last level\n    level_list.append(htag[n-1].name[1])\n    temp_data = subject.split(str(htag[n-1]))\n    # the last subject\n    subject = temp_data[0]\n    # cut the last page content out\n    cut = temp_data[0]\n    # the last page content\n    page_list.append(cut)\n    return head_list, level_list, page_list\n\n \n \n C或C++程式碼 \n 請注意, 目前 CMSimfly 標題內文無法解讀 "/" 符號, 因此若本頁面的標題為\xa0 "C/C++程式碼", 則無法進行分頁. \n /* Runge Kutta for a set of first order differential equations */\n \n#include <stdio.h>\n#include <math.h>\n \n#define N 2 /* number of first order equations */\n#define dist 0.1 /* stepsize in t*/\n#define MAX 30.0 /* max for t */\n \nFILE *output; /* internal filename */\nFILE *output1; /* internal filename */\n// 利用 pipe 呼叫 gnuplot 繪圖\nFILE *pipe;\n \nvoid runge4(double x, double y[], double step); /* Runge-Kutta function */\ndouble f(double x, double y[], int i); /* function for derivatives */\n \nvoid main(){\n \n  double t, y[N];\n  int j;\n \n  output=fopen("osc.dat", "w"); /* external filename */\n  output1=fopen("osc1.dat", "w"); /* external filename */\n \n  y[0]=1.0; /* initial position */\n  y[1]=0.0; /* initial velocity */\n \n  //fprintf(output, "0\\t%f\\n", y[0]);\n \n  for (j=1; j*dist<=MAX ;j++) /* time loop */{\n \n    t=j*dist;\n    runge4(t, y, dist);\n    fprintf(output, "%f\\t%f\\n", t, y[0]);\n    fprintf(output1, "%f\\t%f\\n", t, y[1]);\n  }\n \n  fclose(output);\n  fclose(output1);\n \n  pipe = popen("gnuplot -persist","w");\n  //fprintf(pipe,"set term png enhanced font \\"v:/fireflysung.ttf\\" 18 \\n");\n  fprintf(pipe,"set term png enhanced font \\"y:/wqy-microhei.ttc\\" 18 \\n");\n  //fprintf(pipe,"set yrange [68:70]\\n");\n  fprintf(pipe,"set output \\"test.png\\"\\n");\n  fprintf(pipe, "plot \\"osc.dat\\" title \\"位移\\" with lines, \\"osc1.dat\\" title \\"速度\\" with lines\\n");\n  fprintf(pipe,"quit\\n");\n\n  fprintf(pipe,"quit\\n");\n  pclose(pipe);\n}\n \nvoid runge4(double x, double y[], double step){\n \n  double h=step/2.0, /* the midpoint */\n  t1[N], t2[N], t3[N], /* temporary storage arrays */\n  k1[N], k2[N], k3[N],k4[N]; /* for Runge-Kutta */\n  int i;\n \n  for (i=0;i<N;i++){\n \n    t1[i]=y[i]+0.5*(k1[i]=step*f(x,y,i));\n  }\n \n  for (i=0;i<N;i++){\n \n    t2[i]=y[i]+0.5*(k2[i]=step*f(x+h, t1, i));\n  }\n \n  for (i=0;i<N;i++){\n \n    t3[i]=y[i]+ (k3[i]=step*f(x+h, t2, i));\n  }\n \n  for (i=0;i<N;i++){\n \n    k4[i]= step*f(x+step, t3, i);\n  }\n \n  for (i=0;i<N;i++){\n \n    y[i]+=(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6.0;\n  }\n}\n \ndouble f(double x, double y[], int i){\n \n  if (i==0)\n    x=y[1]; /* derivative of first equation */\n  if (i==1)\n    x=-y[0]-0.5*y[1];\n  return x;\n} \n \n', 'tags': '', 'url': '插入程式碼.html'}, {'title': 'Lua 程式碼', 'text': '-- 導入 js 模組\njs = require("js")\n-- 取得 window\nwindow = js.global\n-- 猜小於或等於 n 的整數\nbig = 100\n-- 計算猜測次數, 配合 while 至少會猜一次\nnum = 1\n-- 利用 window:prompt 方法回應取得使用者所猜的整數\nguess = window:prompt("請猜一個介於 1 到 "..big.." 的整數")\n-- 利用數學模組的 random 函數以亂數產生答案\nanswer = math.random(big)\noutput = ""\n-- 若沒猜對, 一直猜到對為止\nwhile answer ~= tonumber(guess) do\n    if answer > tonumber(guess) then\n        output = "猜第 "..num.." 次, guess="..guess..", answer="..answer.." - too small"\n        print(output)\n    else\n        output = "猜第 "..num.." 次, guess="..guess..", answer="..answer.." - too big"\n        print(output)\n    end \n    guess = window:prompt(output..", 請猜一個介於 1 到 "..big.." 的整數")\n    num = num + 1\nend\nprint("總共猜了 "..num.." 次, answer=guess="..answer.." - correct")\n     \n \n', 'tags': '', 'url': 'Lua 程式碼.html'}, {'title': 'Javascript 程式碼', 'text': 'STLViewer = function(stlpath, plotarea) {\n\n\tvar mycanvas = document.getElementById(plotarea);\n\tvar viewer = new JSC3D.Viewer(mycanvas)\n\tvar theScene = new JSC3D.Scene;\n\t////Initialize with a default file:\n\t//var stlpath = "../../../assets/2013-10-23/stl/box.STL"\n\t//var stlpath = "../../../assets/2013-10-23/stl/taj.stl"\n\tviewer.setParameter(\'SceneUrl\', stlpath);\n    viewer.setParameter(\'InitRotationX\', 20);\n\tviewer.setParameter(\'InitRotationY\', 20);\n\tviewer.setParameter(\'InitRotationZ\', 0);\n\tviewer.setParameter(\'ModelColor\', \'#CAA618\');\n\tviewer.setParameter(\'BackgroundColor1\', \'#FFFFFF\');\n\tviewer.setParameter(\'BackgroundColor2\', \'#383840\');\n\tviewer.init();\n\tviewer.update();\n\t////init done\n\tvar canvas_drop = document.getElementById(\'canvas-drop\')\n\t/*var dropzone = document.getElementById(\'dropzone\')\n\tdropzone.addEventListener(\'dragover\', handleDragOver, false);\n\tdropzone.addEventListener(\'drop\', handleFileSelect, false); */\n\tcanvas_drop.addEventListener(\'dragover\', handleDragOver, false);\n\tcanvas_drop.addEventListener(\'drop\', handleFileSelect, false);\n\n////Drag and drop logic:\n\tfunction handleFileSelect(evt) {\n\t    evt.stopPropagation();\n\t    evt.preventDefault();\n\t    var files = evt.dataTransfer.files;\n\t    console.log(evt)\n\t    console.log(files)\n\t    preview_stl(files[0])\n\t  }\n\n\t  function handleDragOver(evt) {\n\t    evt.stopPropagation();\n\t    evt.preventDefault();\n\t    evt.dataTransfer.dropEffect = \'copy\';\n\t  }\n\n////jsc3d logic\n\tvar handle_file_select = function(e) {\n\t\te.stopPropagation()\n\t\te.preventDefault()\n\t\tvar f = e.target.files[0]\n\t\tpreview_stl(f)\n\t}\n\n\tfunction preview_stl(f) {\n\t\tvar reader = new FileReader()\n\t\tvar ext = f.name.split(".")[1]\n\n\t\tfunction setup_viewer() {\n\t\t\tviewer.setParameter(\'InitRotationX\', 20);\n\t\t\tviewer.setParameter(\'InitRotationY\', 20);\n\t\t\tviewer.setParameter(\'InitRotationZ\', 0);\n\t\t\tviewer.setParameter(\'ModelColor\', \'#CAA618\');\n\t\t\tviewer.setParameter(\'BackgroundColor1\', \'#FFFFFF\');\n\t\t\tviewer.setParameter(\'BackgroundColor2\', \'#383840\');\n\t\t\tviewer.setParameter(\'RenderMode\', "flat");\n\t\t}\n\t\tsetup_viewer()\n\n\t\treader.onload = (function(file) {\n\t\t\treturn function(e) {\n\t\t\t\ttheScene = new JSC3D.Scene\n\t\t    \tstl_loader = new JSC3D.StlLoader()\n\t\t    \tstl_loader.parseStl(theScene, e.target.result)\n\t\t      \t//viewer.init()\n\t\t      \tviewer.replaceScene(theScene)\n\t\t      \tviewer.update()\n\t\t      \tconsole.log("file reader onload")\n\t\t\t}\n\t\t})(f)\n\n\t\tif (ext.toLowerCase() != "stl") {\n\t\t\talert("That doesn\'t appear to be an STL file.");\n\t\t} else {\n\t\t\treader.readAsBinaryString(f)\n\t\t}\n\t}\n}\n \n \n Html 原始碼 \n <html>\n   <head>\n      <meta http-equiv="content-type" content="text/html;charset=utf-8">\n      <title>CMSimfly</title>\n      <link rel="stylesheet" type="text/css" href="/static/cmsimply.css">\n   </head>\n   <body>\n      <div class=\'container\'>\n      <nav>\n         <ul id=\'css3menu1\' class=\'topmenu\'>\n            <li><a href=\'/get_page/簡介\'>簡介</a>\n            <li><a href=\'/get_page/目錄結構\'>目錄結構</a>\n            <li>\n               <a href=\'/get_page/頁面編輯\'>頁面編輯</a>\n               <ul>\n                  <li>\n                     <a href=\'/get_page/插入程式碼\'>插入程式碼</a>\n                     <ul>\n                        <li><a href=\'/get_page/Java 程式碼\'>Java 程式碼</a>\n                        <li><a href=\'/get_page/Python 程式碼\'>Python 程式碼</a>\n                        <li><a href=\'/get_page/C或C++程式碼\'>C或C++程式碼</a>\n                        <li><a href=\'/get_page/Lua 程式碼\'>Lua 程式碼</a>\n                        <li><a href=\'/get_page/Javascript 程式碼\'>Javascript 程式碼</a>\n                        <li><a href=\'/get_page/Html 原始碼\'>Html 原始碼</a></li>\n                        </li>\n                     </ul>\n               </ul>\n            <li><a href=\'/get_page/網際簡報\'>網際簡報</a>\n            <li><a href=\'/get_page/網誌編輯\'>網誌編輯</a>\n            <li><a href=\'/get_page/已知錯誤\'>已知錯誤</a></li>\n         </ul>\n      </nav>\n      <section>\n         <form method=\'post\' action=\'/ssavePage\'>\n         <textarea class=\'simply-editor\' name=\'page_content\' cols=\'50\' rows=\'15\'><h3>Html 原始碼</h3></textarea>\n         <input type=\'hidden\' name=\'page_order\' value=\'9\'>\n         <input type=\'submit\' value=\'save\'>\n         <input type=button onClick="location.href=\'/get_page/Html 原始碼\'" value=\'viewpage\'>\n         </form>\n      </section>\n   </body>\n</html>\nCOPY TO CLIPBOARD\t \n \n', 'tags': '', 'url': 'Javascript 程式碼.html'}, {'title': '網際簡報', 'text': 'CMSimfly 中採用  Reveal.js  作為網際簡報, 其中的維護檔案位於 config/reveal.js, 而對應的簡報檔案則位於 reveal 目錄中. \n', 'tags': '', 'url': '網際簡報.html'}, {'title': '網誌編輯', 'text': 'CMSimfly 彩用  Pelican blog  系統, 編輯檔案位於 config/pelican.leo, 對應的 \n \xa0Markdown 原始檔案位於 markdown 目錄中, 而經 Pelican 轉換出的網誌超文件檔案則位於 blog 目錄中. \n 其餘在網誌文章中所需要的 Javascript 或 Brython 程式檔案, 則與 CMSimfly 及 Reveal.js 共用, 位於 static 目錄下. \n 上傳檔案與圖檔的引用則與 CMSimfly 架構相同. \n', 'tags': '', 'url': '網誌編輯.html'}, {'title': '已知錯誤', 'text': '全部頁面會因無法正確解讀而誤刪 \n 在特定情況下, 系統會誤刪 config/content.htm 檔案, 目前在單頁或全部頁面編輯存檔之前, 或將上一版本的 content.htm 存入 content_back.htm, 若 content.htm 內容被程式誤刪, 可以利用備份檔案複製回原始內容後, 再進行後續處理. \n 頁面標題不支援特殊符號 \n 各頁面標題目前不支援特殊符號, 例如: "/", "?" 等, 若已經發生程式無法解讀頁面的情況, 只能從編輯 config/content.htm 下手, 若系統位於遠端, 則後續必須要再設法提供一個額外的編輯 config/content.htm 檔案的網際連結功能. \n Video 引用不支援內部引用 \n tinymce 中插入 video 的小視窗, 要移除引用的圖像與連結, 因為一般建議不要在內容中存入 .mp4 的影片資料, 而只接受引入影片 URL 連結. \n', 'tags': '', 'url': '已知錯誤.html'}, {'title': '近端配置與管理', 'text': '', 'tags': '', 'url': '近端配置與管理.html'}, {'title': '網路連線設定', 'text': '當不能上網時請先確認IP的取得是自動的 \n 因為教室的IP分配是DHCP server分配的所以要設為自動 \n \n 再來確定瀏覽器的Proxy設定正確 \n 每次上課能用proxy可能都不一樣\xa0 視當天狀況更動 \n 有時可能因為proxy效能不佳\xa0 \xa0所以反而不設定proxy會更快 \n 請依實際狀況決定是否要設定 \n 點擊進階即可進入例外IP設定 \n \n 再來要設定例外IP\xa0 不設定的話電腦會連到proxy去找這些近端IP \n \n 這樣會導致無法連線到自己的動態網頁進行編輯 \n 使用Proxy的原因是不使用的話每台電腦連到同樣的網站都是一次流量 \n 教室這麼多台電腦會造成許多不必要的連線 \n 設置Proxy後只要有一台電腦連線過後 \n Proxy主機就會存有快取資料 \n 之後再連到同樣的網站 \n 就不用再連出去只要跟近端Proxy主機要資料就好 \n 而且近端取得資料較為快速 \n 也不會造成額外不必要的對外連線 \n 適合在區網下有大量電腦使用 \n 非以上情況\xa0 可能會因為Proxy主機效能不佳造成連線緩慢 \n Proxy常見例外IP \n \n 192.168.* \n 127.0.0.1 \n localhost \n \n', 'tags': '', 'url': '網路連線設定.html'}, {'title': '配置可攜程式環境', 'text': '首先取得 Windows 10 64 位元環境下的可攜程式環境 \n (下載\xa0  2019_cdb_w5.7z \xa0or  2019_cdb_w13.7z ) 將其解壓後 \n 放入 USB3.0 規格以上的隨身碟或隨身硬碟 以滑鼠點擊 start.bat 即可開啟可攜隨身系統 \n 以 stop.bat 關閉可攜隨身系統\xa0 隨身碟必須在關閉所有應用程式執行下 \n 才可拔出否則有機率造成隨身碟或檔案損壞 \n 了解基本的 DOS (Disk Operating System) 指令 \n \n 切換目錄:cd \n 列出目前所在目錄的內容:dir \n 可以建立目錄:mkdir \n 清除目前的命令列顯示的內容:cls \n \n', 'tags': '', 'url': '配置可攜程式環境.html'}, {'title': '導入CMSimfly', 'text': '將自己的倉儲clone到近端後\xa0 會發現裡面有.git的資料夾以及README.md \n .git資料夾裡的資料存放著關於倉儲的提交紀錄所以盡量不要去動 \n 而README.md則是github上的顯示內容 \n \n 將CMSimfly( https://github.com/chiamingyen/cmsimfly ) \n clone下來後將.git及README.md以外的東西全部複製到自己的倉儲下 \n cd切換目錄到自己的倉儲後輸入python wsgi.py即可開啟動態網頁 \n 在瀏覽器輸入 https://127.0.0.1:9443 就可以進入網頁開始編輯 \n', 'tags': '', 'url': '導入CMSimfly.html'}, {'title': '校園授權軟體', 'text': '', 'tags': '', 'url': '校園授權軟體.html'}, {'title': 'TWAREN SSL-VPN服務', 'text': '校園授權軟體必須是校內IP才能下載、及授權 \n 所以必須使用學校提供的VPN服務 \n TWAREN SSL-VPN \n 點擊裡面提供的連結下載 Juniper Networks Connect \n 下載符合自己系統的檔案 \n \n 點兩下安裝 之後打開 Network Connect \n \n \n 於登入頁面輸入 https://sslvpn9.twaren.net/nfu 後按執行會跑出 \n \n 這邊輸入校務行政帳密就可以登入 \n \n 這邊按是或永遠 \n \n 這樣就代表連線成功 \n', 'tags': '', 'url': 'TWAREN SSL-VPN服務.html'}, {'title': 'How to Download', 'text': '到學校的電算中心網站 https://nfucc.nfu.edu.tw/zh/ \n 滾動到下面找到校園授權軟體下載專區 \n \n 點進去後會要你輸入校務行政帳密 \n \n 登入後會出現這樣的畫面\xa0 選擇自己需要的軟體下載即可 \n \n 裡面也都附有軟體的授權教學 \n', 'tags': '', 'url': 'How to Download.html'}, {'title': '如何安裝作業系統', 'text': '', 'tags': '', 'url': '如何安裝作業系統.html'}, {'title': 'How to Install Ubuntu', 'text': '先去官網下載Ubuntu的安裝映像檔 https://www.ubuntu.com \n 這邊以Ubuntu Server 18.04 LTS作為示範 \n 點開Download的下拉選單後下載Ubuntu Server \n Desktop是有GUI介面的\xa0 Server是純命令列介面 \n \n 下載完成後打開Oracle VM VirtualBox點擊新增 \n \n 名稱自行命名\xa0 \xa0 機器資料夾如果沒有要放其他地方就預設就好 \n 類型選Linux\xa0 \xa0 版本選Ubuntu (64-bit)\xa0 \n 記憶體大小越大越好以不影響主電腦運行為優先 \n 如果沒有64位元可能是電腦沒有開啟VT或是CPU不支援VT \n 硬碟就選立即建立虛擬硬碟\xa0 之後按建立 \n \n 檔案位置沒有特殊需求一樣預設就好 \n 檔案大小我們習慣設定500GB\xa0 然後選擇動態配置這樣用多少檔案就多大 \n 固定的話你分配多少硬碟就會預先分配多少這樣很佔空間 \n \n 硬碟檔類型選擇VMDK方便以後可以將虛擬轉至實體使用\xa0 按下建立後 \n 會在左方多出一個虛擬機\xa0 這時可以先進行設定\xa0 也可以先安裝完後再設定 \n 這邊先不設定直接點擊啟動 \n \n 然後它會跳出一個視窗讓你選擇安裝系統的映像檔\xa0 選完之後按啟動 \n \n 這邊選擇系統語言\xa0 選擇English \n \n 下一步\xa0 這邊是鍵盤的語言設置一樣都是English \n \n 下一步\xa0 這邊選第一個安裝\xa0 其他兩個是多主機雲端協同用的 \n \n 下一步\xa0 這邊是網路設定\xa0 目前是以NAT上網\xa0 安裝完後再設定\xa0 所以直接下一步 \n \n 下一步\xa0 這邊是Proxy的設定\xa0 這邊是用這個http://140.130.17.4:3128\xa0 \n 若不使用可直接留白 \n \n 下一步\xa0 這邊是Ubuntu下載鏡像檔的網址\xa0 保持預設就好 \n \xa0\xa0 \n 下一步\xa0 這邊是分割硬碟然後格式化這邊選第一個整顆硬碟格式化 \n \n 再來選擇要安裝的硬碟 \n \n 這邊確認OK就下一步 \n \n 它會問你確認要格式化嗎\xa0 選Continue \n \n 下一步\xa0 這邊是設定名字以及登入的帳號密碼 \n 第一第二項是名字\xa0 第三是帳號\xa0 第四是密碼\xa0 第五是確認密碼 \n \n 下一步\xa0 是否要安裝OpenSSH\xa0 這邊選擇要 \n \n 下一步\xa0 這邊 選擇想要安裝的伺服器組合\xa0 如果不要直接下一步就好\xa0 就會開始安裝了 \n \n 有一條槓槓再轉就是正在安裝 \n \n 安裝完後選Reboot重開就安裝完成了 \n 剛開機會需要輸入帳號密碼 \n 使用sudo都需要輸入密碼 \n 關機使用 sudo shutdown -h now\xa0 關機並關電源 \n 使用 sudo halt\xa0 是關機但不關電源 \n', 'tags': '', 'url': 'How to Install Ubuntu.html'}, {'title': 'How to Install windows10', 'text': '\n 這邊是在虛擬機進行安裝\xa0 在實體電腦上大同小異 \n 開機時按F8使用光碟或USB開機進入安裝\xa0 或是按del進BIOS調整開機順序也可以 \n 安裝完之後要進行授權 \n \n', 'tags': '', 'url': 'How to Install windows10.html'}, {'title': 'FileZilla', 'text': '這是一款免費的FTP軟體\xa0 官網( https://filezilla-project.org ) \n 進入官網後點擊這個進入下載頁面 \n \n 進來後會看到這個\xa0 請點擊最下面的\xa0 Show additional download options \n \n 進去後會看到各系統的載點\xa0 我們下載windows(64bit)的zip可攜版本 \n \n 下載完成後直接解壓縮到隨身碟就可以使用了 \n 開啟後長這樣 \n \n 點擊左上角的檔案打開站台管理員 \n \n 之後點擊新增站台\xa0 名稱自訂\xa0 協定使用SFTP\xa0 主機輸入Ubuntu的IP\xa0 連接埠留白即可 \n 登入形式選詢問密碼\xa0 使用者就是Ubuntu安裝時設定的name\xa0 設定完後就可以確認保存 \n \n', 'tags': '', 'url': 'FileZilla.html'}, {'title': 'Ubuntu環境配置', 'text': '', 'tags': '', 'url': 'Ubuntu環境配置.html'}, {'title': '環境準備', 'text': '可以按下面的步驟自行配置或是下載已經配置好的虛擬機 vmdk壓縮檔 \n \n 安裝最新版的 Virtualbox \n 建立 Ubuntu 18.04 虛擬主機 \n 以網路卡橋接啟動 Ubuntu 伺服器 \n 使用以下指令來安裝所需要的軟體 \n \n \n sudo apt install nginx \n sudo apt install uwsgi \n sudo apt install python3-pip \n sudo apt install uwsgi uwsgi-plugin-python3 \n sudo apt install ssh \n sudo apt install git \n sudo pip3 install flask bs4 lxml \n sudo pip3 install uwsgi \n \n Fossil 由於這樣安裝的版本會較舊\xa0 所以另有分頁說明安裝方法 \n 接下來需要修改一些設定 \n Ubuntu 18.04 /etc/netplan/50-cloud-init.yaml \n 這邊的網路設定僅供參考\xa0 須依所在的網路環境進行調整 \n # This file is generated from information provided by\n# the datasource.  Changes to it will not persist across an instance.\n# To disable cloud-init\'s network configuration capabilities, write a file\n# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:\n# network: {config: disabled}\nnetwork:\n    ethernets:\n        enp0s3:\n            dhcp4: true \n            dhcp6: false \n            #addresses: \n            #- 192.168.1.13/24\n            #- 2001:288:6004::1/64\n            gateway4: 192.168.1.1\n            #gateway6: 2001:288:6004::254\n            nameservers:\n                addresses:\n                - 168.95.1.1\n                - 8.8.8.8\n                - 140.130.1.2\n                - 2001:288:6004:1::2\n                - 2001:b000:168::1\n    version: 2\n \n /etc/nginx/sites-available/default \n 以下路徑的部分請依實際狀況做更改\xa0 這是為了讓nginx知道要伺服哪個路徑 \n server {\n    listen 80;\n    listen [::]:80;\n    root /home/server-50733143/repository/2019wcmj;\n    index index.html;\n\n    location /static {\n        alias /home/server-50733143/repository/2019wcmj/static/;\n    }\n\n    location /downloads {\n        alias /home/server-50733143/repository/2019wcmj/downloads/;\n    }\n\n    location /images {\n        alias /home/server-50733143/repository/2019wcmj/images/;\n    }\n\n    location / {\n            try_files $uri $uri/ =404;\n    } \n    \n    location /blog {\n        alias /home/server-50733143/repository/2019wcmj/blog/;\n    }\n\n    location /reveal {\n        alias /home/server-50733143/repository/2019wcmj/reveal/;\n    }\n}\n\nserver {\n    listen 443 ssl;\n    #listen [::]:443 ssl ipv6only=on;\n \n    location /static {\n        alias /home/server-50733143/repository/2019wcmj/static/;\n    }\n \n    location / {\n        include uwsgi_params;\n        uwsgi_pass  127.0.0.1:8080;\n    }\n \n    #server_name ipv4_ip; \n    #ssl on;\n    ssl_certificate /etc/stunnel/localhost.crt;\n    ssl_certificate_key /etc/stunnel/localhost.key;\n    ssl_session_timeout 5m;\n    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;\n    ssl_ciphers "HIGH:!aNULL:!MD5 or HIGH:!aNULL:!MD5:!3DES";\n    ssl_prefer_server_ciphers on;\n    try_files $uri $uri/ =404;\n} \n 再來請創建一個資料夾及ini檔\xa0 一起放在 /home/使用者名稱/ \n 這個目錄下即可 \n \n uwsgi.ini \n 路徑與ID的部分一樣請依實際狀況做更改 \n [uwsgi]\nsocket = 127.0.0.1:8080\nuid = server-50733143\ngid = server-50733143\nplugins-dir = /usr/lib/uwsgi/plugins/\nplugin = python3\nmaster = true\nlogto = /var/log/uwsgi/emperor.log\nlogfile-chown = server-50733143:server-50733143\nprocesses = 4\nthreads = 2\nchdir = /home/server-50733143/repository/2019wcmj\nwsgi-file = /home/server-50733143/repository/2019wcmj/wsgi.py\n \n 再來創建一個 cmsimfly.service 檔\xa0 這個則放在 /etc/systemd/system\xa0  這個目錄下 \n cmsimfly.service \n 路徑與ID一樣請依情況更改\xa0 這個檔案是要讓CMSimfly能隨開機啟動 \n [Unit]\nDescription=uWSGI to serve CMSimfly\nAfter=network.target\n \n[Service]\nUser=server-50733143\nGroup=server-50733143\nWorkingDirectory=/home/server-50733143/uwsgi_ini\nExecStart=/usr/local/bin/uwsgi --emperor /home/server-50733143/uwsgi_ini\n \n[Install]\nWantedBy=multi-user.target \n CMSimfly與自己的倉儲可以在Ubuntu中直接下指令clone \n 或是使用FileZilla送進去也可以\xa0 只是礙於權限問題只能送到 /home/使用者名稱/ \n 這個目錄下\xa0 要送到其他地方只能先送到這個目錄再來使用 sudo cp 檔案名稱 路徑 \n 才能將檔案複製過去\xa0 又或是直接在Ubuntu下使用vi\xa0 直接編輯但這樣速度太慢 \n 建議在windows下編輯完後使用FileZilla送入home再來使用cp覆蓋 \n 還有新版的CMSimfly\xa0  init.py 中的設定為 \xa0 uwsgi = True  這是for Ubuntu \n 若要在windows環境下使用須改為False \n 檔案都配置好後就可以下指令啟用了 \n /etc/netplan/50-cloud-init.yaml\xa0\xa0 配置好後使用\xa0 sudo netplan try \n 若沒有提示錯誤就可以按Enter套用 \n sudo /usr/bin/uwsgi --emperor /home/kmol2019/uwsgi_ini \n 這是用來啟動uwsgi\xa0 啟動剛剛創建的 uwsgi.ini \n 接著將 cmsimfly 服務設為隨系統開機啟動: \n sudo systemctl enable cmsimfly \n 取消的話則改成disable即可取消 \n 手動啟動 cmsimfly.service 服務 \n sudo systemctl start cmsimfly \n 停止則改為stop即可 \n', 'tags': '', 'url': '環境準備.html'}, {'title': 'Fossil SCM', 'text': 'Fossil是一個分散式版本控制系統\xa0 類似Git \n 請到他們官網下載windows及linux版本( https://fossil-scm.org ) \n 到Download Page下載最新的版本 \n \n 將windows版解壓縮到Y:下\xa0 這樣當Ubuntu配置好Fossil後\xa0 才有辦法使用 \n Ubuntu使用sudo apt install fossil\xa0 安裝完後的版本為2.5 \n 還要安裝 sudo apt install stunnel\xa0 這是為了在https模式下使用Fossil SCM伺服器 \n 所以我們將Linux版解壓縮\xa0 \xa0使用FileZilla送到Ubuntu的 /home/kmol2019/ \n 再使用sudo cp fossil /usr/bin/\xa0 用新版的fossil蓋掉舊版的\xa0\xa0 \n 複製後\xa0 再用 fossil version 查驗版本\xa0 確認為最新的 2.8 版 \n 再來修改 /etc/environment 加入HTTPS=on \n 修改 /etc/default/stunnel4 將 ENABLED=0 改為 1 \n 再來創建一個 stunnel.conf \n 路徑依照實際狀況修改 \n [https]\naccept = server-50733143:5443\n# 只先啟用 ipv4\n#accept = :::443\ncert = /etc/stunnel/localhost.crt\nkey = /etc/stunnel/localhost.key\nexec = /usr/bin/fossil\nexecargs = /usr/bin/fossil http /home/server-50733143/repository/2019wcmj/ --https --nojail --notfound 2019wcmj \n 表示利用 stunnel 執行 fossil 指令 並且透過 http 協定啟動 \n 位於/home/server-50733143/repository/2019wcmj/目錄下的倉儲壓縮檔案 \n 其中 --nojail 目的在 drop the root privilege but do not enter the chroot jail \n 其後的 --notfound 表示若沒有特別在 URL 中列出所要擷取的 .fossil 檔案 \n  (指位於 /home/server-50733143/repository/2019wcmj/ 目錄下) \n 則採用 2019wcmj.fossil \n 假如此時 /etc/stunnel 目錄下尚無 localhost.crt 與 localhost.key 可以利用下列指令建立 \n sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt \n 配置好後使用sudo /etc/init.d/stunnel4 restart 將stunnel4重啟 \n 使用方法如下 \n 創建一個資料夾並切換目錄到資料夾\xa0 mkdir 資料夾名稱\xa0 cd資料夾名稱 \n 初始化一個倉儲fossil init 名稱.fossil\xa0 名稱自行命名 \n 接著會跳出一小段密碼請記住它\xa0 登入fossil時會用到 \n 然後到windows下的可攜系統輸入 \n fossil clone  https://IP:5443/資 料夾名稱 檔案名稱 \n 我的範例\xa0 fossil clone  https://192.168.1.107:5443 /server-50733143 server-50733143.fossil \n clone回來後使用fossil open 路徑/檔案名稱 \n Ubuntu那邊一樣要open \n 範例fossil open server-50733143/server-50733143.fossil \n 之後就可以在資料夾中加入檔案要提交的時候跟Git差不多 \n 先fossil addremove\xa0 再fossil commit -m "提交訊息" \n 最後fossil push  https://使用者名 @IP:5443 \n 過程會需要輸入密碼就輸入網站登入的密碼即可 \n 這樣就完成提交了 \n 提交完成後\xa0 Timeline 跟 Files都會出現新的提交 \n \n \n \n 若要讓Ubuntu的資料夾更新輸入 \n fossil update即可更新類似Git的git pull \n \n', 'tags': '', 'url': 'Fossil SCM.html'}, {'title': 'Git', 'text': '', 'tags': '', 'url': 'Git.html'}, {'title': '建立GitHub倉儲', 'text': '建立倉儲有兩種方法, 以下介紹的是其中一種比較簡易, \n 另一種需要自己下指令來初始化倉儲較為麻煩. \n \n', 'tags': '', 'url': '建立GitHub倉儲.html'}, {'title': '啟用GitHub Pages', 'text': '\n 啟用後GitHub Pages預設會伺服根目錄下的index.html \n', 'tags': '', 'url': '啟用GitHub Pages.html'}, {'title': '建立 OpenSSH 格式的 Private 與 Public Keys', 'text': '\n 建立金鑰命令:ssh-keygen -t rsa -b 4096 -C "註解" \n -keygen是生成金鑰 \n -t是演算法類別rsa是其中一種 \n -b是要生成多大的金鑰 \n -C是加入註解 \n', 'tags': '', 'url': '建立 OpenSSH 格式的 Private 與 Public Keys.html'}, {'title': '使用 SSH 執行 Git clone 與 push', 'text': '\n', 'tags': '', 'url': '使用 SSH 執行 Git clone 與 push.html'}, {'title': '倉儲改版', 'text': '建立 Git 倉儲後, 並 clone 至近端工作後, 對遠端倉儲改版. \n 可攜系統中已經內建 git, 可以在啟動 start.bat 後, 透過 path 的路徑設定,  \n 可以直接執行 git 指令. \n 使用者改版後, 可以直接透過 git add, commit 與 push 對遠端倉儲改版. \n Git基本指令 \n \n git add :把已修改的檔案增加暫存區, 可以加單一檔案也可以使用 . 增加所有檔案. \n git commit -m "提交訊息" :m=message, 用來將暫存區的檔案加到.git目錄下. \n git push :將提交的內容推到遠端倉儲加上 -f 會強制push覆蓋掉遠端資料,請小心使用. \n git pull :將遠端較新的資料拉回近端合併, 當push的時候有提示遠端的版本更新時, 請先拉後推, 不要直接使用-f. \n \n', 'tags': '', 'url': '倉儲改版.html'}, {'title': '將 portablegit 中的 helper = manager 的設定移除', 'text': '\n 這麼做是為了不要讓git在電腦中儲存你的帳號資料 \n 如果是私人電腦可以不做\xa0 在公共電腦的話還是做一下比較好 \n', 'tags': '', 'url': '將 portablegit 中的 helper = manager 的設定移除.html'}, {'title': '介紹圖形化git工具', 'text': '在可攜系統中配置有ungit可以使用\xa0 使用方法如下 \n 切換目錄到倉儲下後輸入kungit \n chrome會跳出一個新的分頁 \n 就可以不用手動key命令 \n \n 還有GitExtensions可以使用 \n 這是他們的github( https://github.com/gitextensions/gitextensions ) \n 這是官方載點( https://github.com/gitextensions/gitextensions/releases ) \n 官方有提供安裝版及可攜版 \n 這是KMOL製作的可攜版( https://drive.google.com/open?id=1_pH2cKAGeH3OGwZUFPJwsi7WcX3ELvph ) \n 以上介紹兩款都是可攜的 \n 還有幾款也是蠻多人用的像是 \n \n Sourcetree \n GitHub Desktop \n \n 當然還有更多\xa0 這邊就不多作介紹了 \n', 'tags': '', 'url': '介紹圖形化git工具.html'}, {'title': '儲存設備格式化', 'text': '大家應該都有發現要將單檔4G以上的檔案放入隨身碟都會出現 \n 「檔案太大無法放置在目的地檔案系統」 \n 這是受限於FAT32這個檔案系統\xa0\xa0 最大單一檔案大小為 \xa02^32\xa0 位元組 =\xa04GB\xa0 \n 這時我們可以將隨身碟格式化成exFAT \n 將你的隨身碟插入電腦\xa0 並將資料都先取出\xa0 因為格式化會清空資料 \n 對隨身碟右鍵點擊格式化 \n \n 之後檔案系統選擇exFAT\xa0 配置單位就不要動\xa0 快速格式化就看自己要不要用 \n \n 不要動或是選預設配置大小也可以 \n \n 都選好之後就按開始即可\xa0 等它格式化完就可以把資料移回去了 \n 為什麼不使用NTFS呢? \n 因為NTFS分區是採用「日誌式」的檔案系統\xa0 需要記錄詳細的讀寫操作 \n 每次的讀寫操作都需要紀錄所以會頻繁的讀寫\xa0 比較傷快閃記憶體磁碟晶片 \n 並不適合隨身碟使用 \n 但如果是外接硬碟就可以使用NTFS但NTFS為windows的檔案系統 \n 在Mac系統或其他系統無法使用在相容性上較差 \n exFAT \n 跨系統相容性佳\xa0 如Windows、Mac OS X與Linux \n 沒有單檔4G的限制 \n 讀取大容量檔案時獲得更理想的速度 \n', 'tags': '', 'url': '儲存設備格式化.html'}, {'title': '產生亂數1~51', 'text': '\n click \n <p><button onclick="myFunction()">click</button></p>\n<p id="demo"></p>\n<script>\nfunction myFunction() {\n  document.getElementById("demo").innerHTML = Math.floor(Math.random()*50+1);\n}\n</script> \n \n \n \n \n', 'tags': '', 'url': '產生亂數1~51.html'}, {'title': '網管期中自評影片', 'text': '\n', 'tags': '', 'url': '網管期中自評影片.html'}, {'title': '網管期末自評影片', 'text': '', 'tags': '', 'url': '網管期末自評影片.html'}, {'title': 'ROC flag', 'text': '如果是使用舊版CMSimfly需先修改flaskapp.py才可show圖 \n 使用最新版的CMSimfly就沒有這個問題 \n savePage()的修改 \n def savePage():\n    """save all pages function"""\n    page_content = request.form[\'page_content\']\n    # when element_format : "html", need to remove the annoying comment to prevent brython exec\n    page_content = [w.replace(\'// <![CDATA[\', \'\') for w in page_content]\n    page_content = [w.replace(\'// ]]>\', \'\') for w in page_content]\n    # check if administrator\n...... \n def ssavePage()的修改 \n def ssavePage():\n    """seperate save page function"""\n    page_content = request.form[\'page_content\']\n    # when element_format : "html", need to remove the annoying comment to prevent brython exec\n    page_content = page_content.replace(\'// <![CDATA[\', \'\')\n    page_content = page_content.replace(\'// ]]>\', \'\')\n    page_order = request.form[\'page_order\']\n    if not isAdmin():\n...... \n 修改後可show出圖但會有Edit All無法使用的狀況save會出現Error \n 過渡方案可以使用其他編輯器對..\\2019wcmj\\config\\content.html進行編輯 \n 效果是一樣的只是需要了解一點html的語法 \n canvas繪圖程式碼 \n <!-- 導入 Brython 標準程式庫 -->\n<script src="./../cmsimde/static/brython.js"></script>\n<script src="./../cmsimde/static/brython_stdlib.js"></script>\n<p></p>\n<!-- 啟動 Brython -->\n<script>\nwindow.onload=function(){\n// 設定 data/py 為共用程式路徑\nbrython({debug:1, pythonpath:[\'./../data/py\']});\n}\n</script>\n<p><canvas height="400" id="plotarea" width="600"></canvas></p>\n<script type="text/python">\n# 導入 doc\nfrom browser import document as doc\nimport math\n\n# 準備繪圖畫布\ncanvas = doc["plotarea"]\nctx = canvas.getContext("2d")\n# 進行座標轉換, x 軸不變, y 軸反向且移動 canvas.height 單位光點\n# ctx.setTransform(1, 0, 0, -1, 0, canvas.height)\n# 以下採用 canvas 原始座標繪圖\nflag_w = canvas.width\nflag_h = canvas.height\ncircle_x = flag_w/4\ncircle_y = flag_h/4\n# 先畫滿地紅\nctx.fillStyle=\'rgb(255, 0, 0)\'\nctx.fillRect(0,0,flag_w,flag_h)\n# 再畫青天\nctx.fillStyle=\'rgb(0, 0, 150)\'\nctx.fillRect(0,0,flag_w/2,flag_h/2)\n# 畫十二道光芒白日\nctx.beginPath()\nstar_radius = flag_w/8\nangle = 0\nfor i in range(24):\n    angle += 5*math.pi*2/12\n    toX = circle_x + math.cos(angle)*star_radius\n    toY = circle_y + math.sin(angle)*star_radius\n    # 只有 i 為 0 時移動到 toX, toY, 其餘都進行 lineTo\n    if (i):\n        ctx.lineTo(toX, toY)\n    else:\n        ctx.moveTo(toX, toY)\nctx.closePath()\n# 將填色設為白色\nctx.fillStyle = \'#fff\'\nctx.fill()\n# 白日:藍圈\nctx.beginPath()\nctx.arc(circle_x, circle_y, flag_w*17/240, 0, math.pi*2, True)\nctx.closePath()\n# 填色設為藍色\nctx.fillStyle = \'rgb(0, 0, 149)\'\nctx.fill()\n# 白日:白心\nctx.beginPath()\nctx.arc(circle_x, circle_y, flag_w/16, 0, math.pi*2, True)\nctx.closePath()\n# 填色設為白色\nctx.fillStyle = \'#fff\'\nctx.fill()\n</script> \n  導入 Brython 標準程式庫  \n \n \n \n  啟動 Brython  \n \n \n \n \n \n', 'tags': '', 'url': 'ROC flag.html'}]};