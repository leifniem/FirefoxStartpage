const app = document.querySelector('#app')
const info = document.querySelector('#info')
let time, date

const infoTemplate = (time, date) => /* html */`<span class="highlight">${time}</span> &mdash; <span class="hightlight">${date}</span>`

const itemTemplate = item => /* html */`
	<div class="item" data-color-1="${item.palette[0]}" data-color-2="${item.palette[0]}">
		<a href="${item.link}" target="_blank" rel="noopener noreferrer">
			<img src="${item.image}">
			<div class="text" style="background: linear-gradient(0deg, ${item.palette[0]}ff 30%, ${item.palette[0]}00);">
				<h2 style="color: ${item.palette[1]};">${item.title}</h2>
				<span style="color: ${item.palette[3]};">${item.link}</span>
			</div>
		</a>
	</div>
`

function loadMuzli() {
  try {
    fetch('https://beta.api.muz.li/v1/feed/muzli?Authorization=Bearer+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNDU4NzM4ODYzNTM5MTE2Mjk3OCIsImlhdCI6MTU5OTQyMTg2MX0.4VHsMz-HZC8u0iZ_jlF6zJN5aNe4J1tLG6tR6xIFcCo&limit=15&sort=created', {
      mode: 'cors'
    })
      .then(res => res.json())
      .then(data => {
        data.feed.forEach(item => {
          app.insertAdjacentHTML('beforeend', itemTemplate(item))
          console.log(item);
        })
      })
  } catch (err) {
    console.error(err)
  }
}

function loadInfo() {
  const utc = new Date()
  time = utc.toLocaleTimeString('de-DE').slice(0, 5)
  date = utc.toLocaleDateString('de-DE')
  info.innerHTML = infoTemplate(time, date)
}

function init() {
  loadInfo()
  loadMuzli()

  setInterval(loadInfo, 15000)
}

window.onload = init()