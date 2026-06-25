/*
 * 我们的故事 —— 写给囡囡（黄亚平）的生日告白
 * 这个文件是“内容”，app.js 负责把它渲染成动画。
 * 你可以随时只改这里的文字 / 照片路径，不用动其它代码。
 *
 * 照片都在 ./assets/photos/provided/ 里。
 * 南京初见那一张你之后补好，存成 ./assets/photos/provided/南京初见.jpg 就会自动出现。
 */
window.STORY = {
  meta: {
    her: "黄亚平",
    nickname: "囡囡",
    birthday: "农历五月十二",
  },

  bgm: "./assets/music/bgm.mp3",

  // ——— 第一幕：开场（web19 流光丝带，静音，点“开始”后才放音乐）———
  intro: {
    terminal: [
      "> 正在编译我们的故事 our_story.js",
      "> 读取起点：小红书的一条评论 …… ok",
      "> 加载两年的所有片段 …… ok",
      "> 准备就绪 ✓",
    ],
    title: "囡囡",
    subtitle: "生日快乐",
    line: "农历五月十二 · 写给我最喜欢的女生",
    hint: "（先静音）移动鼠标，再轻触开始",
    start: "开始",
  },

  // ——— 第二幕：故事线（电影式整屏翻页）———
  // type: "text" 纯文字卡 | "photo" 照片页 | "video" 视频页
  // layout: "full"(整屏图) | "frame"(留白裱框) —— 影响排版
  pages: [
    // 序 · 网友期
    {
      type: "text",
      chapter: "序",
      kicker: "2024 · 屏幕的两端",
      title: "一切，从一条评论开始",
      text: "我们第一次认识，是在小红书的一条评论里。\n那时谁也没想到，这会变成后来的每一天。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/01-微醺.jpg",
      layout: "frame",
      text: "你微醺的时候发来这张。\n我盯着看了很久——原来一个人，可以这么好看。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/04-很素的自拍.jpg",
      layout: "frame",
      text: "一袭白裙，很素的一张自拍。\n可越是素净，越好看。",
    },
    {
      type: "text",
      text: "最开始，我们像在黑暗里抱团取暖。\n开心的、难过的、说不出口的，都想第一个告诉你。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/02-老照片.jpg",
      layout: "frame",
      text: "你连小时候的照片都翻给我看。\n原来你从那么小，就这么可爱。",
    },

    // 一 · 南京初见
    {
      type: "text",
      chapter: "一",
      kicker: "2025.05.04 · 南京",
      title: "那一天，南京有风",
      text: "终于见面了。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/南京初见.jpg",
      layout: "full",
      text: "天有点凉，阳光很足，还有微风。\n你从我身后走过来，碎花裙子、粉红色的帽子，阳光落在你身上——\n那一面，我被你彻底惊艳到了。",
    },

    // 二 · 爱意凝结
    {
      type: "text",
      chapter: "二",
      kicker: "之后",
      title: "爱意开始凝结",
      text: "见面之后，喜欢就有了真实的温度。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/03-第一次见面.jpg",
      layout: "frame",
      text: "你很喜欢我穿这件，虽然它已经又旧又小。\n那段时间你很忧郁、很焦虑，却还是把最好的都想给我，\n还偷偷给我买了好多东西。",
    },

    // 三 · 我们走过的城市
    {
      type: "text",
      chapter: "三",
      kicker: "杭州 · 苏州 · 合肥",
      title: "我们走过的那些地方",
      text: "见面不算多。\n所以每一次能靠近，我都记得很清楚。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/05-v第一次大头贴.jpg",
      layout: "frame",
      text: "杭州，我们第一次拍大头贴。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/20-大头贴.jpg",
      layout: "frame",
      text: "这一张里，我们俩都好看。嘿嘿。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/08-苏州喜欢皱眉.jpg",
      layout: "frame",
      text: "你第一次来苏州。\n还是喜欢皱眉——不好，可我就是喜欢看。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/11-去杭州找你.jpg",
      layout: "frame",
      text: "我去杭州找你，你那天还在上课。\n能见你一面，怎样都值。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/13-灵隐寺.jpg",
      layout: "frame",
      text: "灵隐寺。\n求来的签里，我只想要一个关于你的答案。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/10-看演唱会.jpg",
      layout: "frame",
      text: "你来苏州看张韶涵。\n那时我们还在磨合，可我已经不想松手了。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/09-大大小小.jpg",
      layout: "frame",
      text: "合肥。\n大大的我，和小小的你。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/15-你喜欢的猫咪.jpg",
      layout: "frame",
      text: "还有你最喜欢的那只猫咪。\n你喜欢的，我都想记住。",
    },

    // 四 · 你兜住我（完整坦诚）
    {
      type: "text",
      chapter: "四",
      kicker: "后来",
      title: "谢谢你，兜住了我",
      text: "再后来，压力一起落到我身上。\n毕业、申请、英语、经济……压得我喘不过气。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/07-睡颜.jpg",
      layout: "frame",
      text: "我开始喜怒无常，把最差的情绪丢给你。\n你常常这样安静地睡着——可我知道，很多个白天，你偷偷哭过。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/24-我们吵架.jpg",
      layout: "frame",
      text: "我们吵了很多架。\n你对感情的需求那么浓烈，却为我一退再退。\n对不起，囡囡。是不是连一场网恋，都比不上。",
    },
    {
      type: "photo",
      img: "./assets/photos/provided/19-心形头发.jpg",
      layout: "frame",
      text: "可你还是兜住了我。\n没有你，那段日子我一定撑不过去。",
    },
    {
      type: "text",
      text: "我说过，我们已经走到了相知的阶段。\n这一路你受的委屈，我都记得，也都想用以后慢慢还给你。",
    },
  ],

  // ——— 第三幕：表白 ———
  finale: {
    // 出国 · 让她放心
    prelude: [
      "两个月后，我要出国了。",
      "我知道，这让未来看起来变得不确定，也让你迷茫。",
      "但我想让你放心——",
      "距离不是我退缩的理由，",
      "而是我更要稳住、更要认真、更要给你安全感的开始。",
    ],
    // 打字机情书核心
    confession: "黄亚平，我爱你。",
    big: "I LOVE YOU",
    // 你给的那段话
    words: [
      "世界上最甜蜜的事，",
      "就是在我喜欢你的每一天里，也同样被你喜欢着。",
      "我们都在互相陪伴，然后彼此成长。",
      "你要知道，你现在在我的心里，是排名第一的那个人。",
      "我会躲过新鲜感，然后无限循环地爱你。",
    ],
    // 王小波
    wangxiaobo:
      "我的勇气和你的勇气加起来，对付这个世界总够了吧？\n我一个人是不敢的，有了你，我就敢。",
    wangxiaoboBy: "—— 王小波",
    ending: "囡囡，生日快乐。",
    closing: "不要觉得人生是那么无望，\n我多希望你可以一直快乐。",
    replay: "再看一遍",
  },
};
