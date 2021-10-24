const ctx = document.getElementById('myChart').getContext('2d');

let delayed;

let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(153,0,255,1)');
gradient.addColorStop(1, 'rgba(59,0,110, 0.3)');

const labels = [
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
];

const data = {
  labels,
  datasets: [{
    data: [250, 302, 412, 244, 299, 600, 312, 555, 534],
    label: 'Sales',
    fill: true,
    backgroundColor: gradient,
    borderColor: '#fff',
    pointBackgroundColor: '#d9a3ff',
  }],
};

const config = {
  type: 'line',
  data: data,
  options: {
    radius: 5,
    hitRadius: 30,
    hoverRadius: 12,
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.dataIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '$' + value + 'm';
          },
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);