const cats = [
  {
    id: 'komaru',
    bday: '05/22/2017'
  },
  {
    id: 'cocoa',
    bday: '05/12/2019'
  },
  {
    id: 'komugi',
    bday: '03/23/2016'
  },
  {
    id: 'panchan',
    bday: '12/13/2016'
  },
  {
    id: 'suu',
    bday: '02/14/2015'
  },
  {
    id: 'goromaru',
    bday: '11/10/2015'
  },
  {
    id: 'goma',
    bday: '10/20/2013'
  },
  {
    id: 'tobokun',
    bday: '04/25/2018'
  },
  {
    id: 'ototo',
    bday: '12/04/2006',
    died: '09/09/2023'
  }
]

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

const now = new Date()
let playConfetti = false

for (const cat of cats) {
  const item = document.getElementById(cat.id)
  if (item) {
    const header = item.querySelector('h3')
    const progress = item.querySelector('.progress-bar')
    const bday = new Date(cat.bday)
    const prevBday = new Date(cat.bday)
    const nextBday = new Date(cat.bday)
    if (cat.died) {
      header.innerHTML += '🌈'
      const died = new Date(cat.died)
      prevBday.setFullYear(died.getFullYear())
      if (prevBday.getTime() > died.getTime()) {
        prevBday.setFullYear(died.getFullYear() - 1)
      }
      const currentCatYear = died.getFullYear() - bday.getFullYear()
      progress.style.width = '100%'
      progress.classList.add('bg-secondary')
      item.querySelector('.current-year').textContent = currentCatYear
      item.querySelector('.next-year').textContent = currentCatYear
      item.querySelector('.bday-date').textContent = prevBday.toLocaleDateString('ru')
      item.querySelector('.bday-next').textContent = died.toLocaleDateString('ru')
    } else {
      prevBday.setFullYear(now.getFullYear())
      if (prevBday.getTime() > now.getTime()) {
        prevBday.setFullYear(now.getFullYear() - 1)
        nextBday.setFullYear(now.getFullYear())
      } else {
        nextBday.setFullYear(now.getFullYear() + 1)
      }
      const daysDiff = dateDiffInDays(prevBday, nextBday)
      const daysLeft = dateDiffInDays(now, nextBday)
      const currentCatYear = now.getFullYear() - bday.getFullYear()
      const percent = ((daysDiff - daysLeft) / daysDiff) * 100
      if (percent === 0) {
        if (playConfetti) {
          header.innerHTML += '🎂'
        } else {
          header.innerHTML += '<span id="cake">🎂</span>'
        }
        playConfetti = true
      }
      header.innerHTML += `<small>${bday.toLocaleDateString('ru')}, ${daysLeft}/${daysDiff}</small>`
      progress.style.width = percent + '%'
      item.querySelector('.current-year').textContent = currentCatYear
      item.querySelector('.next-year').textContent = currentCatYear + 1
      item.querySelector('.bday-date').textContent = prevBday.toLocaleDateString('ru')
      item.querySelector('.bday-next').textContent = nextBday.toLocaleDateString('ru')
    }
  }
}
if (playConfetti) {
  const confetti = new Confetti('cake')
  confetti.setCount(100)
  confetti.setSize(2)
  confetti.setPower(25)
  confetti.setFade(false)
  confetti.destroyTarget(false)
  setTimeout(() => {
    const button = document.getElementById('cake')
    if (button) {
      const { x, y } = button.getBoundingClientRect()
      let evt = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': x,
        'clientY': y
      })
      button.dispatchEvent(evt)
    }
  }, 1000)
}