import  {TabSpec} from '../types/TabSpec'


function makeTabSpecs(data: any, active: string) {
    const path = data.canonical.match(/\/([^\/]+)\/$/)[0]

    let tabSpecs = [
        { label: 'Best Moments', url: '/compositions' +  path, active: active == 'best-moments' },
        { label: 'Backstory', url: '/backstories' +  path, active: active == 'backstory' },
    ]

    if ('plot' in data) {
        tabSpecs.push(
            {label: 'Plot', url: '/plots' +  path, active: active == 'plot'})
    }

    if ('listen-guide' in data) {
        tabSpecs.push(
            {label: 'Listen Guide', url: '/listen-guides' +  path, active: active.startsWith('listen')})
    }

    if ('listen-guide-1' in data) {
        tabSpecs.push(
            {label: 'Listen Guides', url: '/listen-guides' +  path, active: active.startsWith('listen')})
    }

    return tabSpecs
}

export default makeTabSpecs
