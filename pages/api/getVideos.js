const Videos = async (req, res) => {
  const data = {
    items: [
      {
        link: 'https://www.youtube.com/embed/QlmB2iTd66s'
      },
      {
        link: 'https://www.youtube.com/embed/nVEKzMDzzTU?si=CnCLquqFhEuIIQ0e',
      },
      {
        link: 'https://www.youtube.com/embed/HRLDg5v9oBM?si=mjwK3WLQ1so1520x',
      },
      {
        link: 'https://www.youtube.com/embed/1tv7JKV9Y-g?si=KrV2fep6S7CWFs38',
      },
      {
        link: 'https://www.youtube.com/embed/Nk71KJYXZww?si=d-tws98rrdX6TEzs',
      },
      {
        link: 'https://www.youtube.com/embed/hVzZLJ1pDKw?si=FtJ_9Xl_24aRQXeD',
      },
      {
        link: 'https://www.youtube.com/embed/3e771ly1dAQ?si=0mtzcwI7PNszpuiP',
      },
      {
        link: 'https://www.youtube.com/embed/gSlBiZqiIqY?si=vqARzmvkpNh_WsPO',
      },
      {
        link: 'https://www.youtube.com/embed/vP1ZNltLqfA?si=BKDW8WIcyeFJvfxt',
      },
      {
        link: 'https://www.youtube.com/embed/7LRAsjs_ujA?si=3TdMXmYeKtLerZR_',
      },
    ],
  };

  res.status(200).json(data);
};

export default Videos;
