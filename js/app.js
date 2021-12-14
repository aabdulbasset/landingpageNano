const sections = document.querySelectorAll("section")
//Build the navigation menu
sections.forEach((item)=>{
    const elem = document.createElement("li") 
    elem.appendChild(document.createTextNode(item.dataset.nav))
    elem.className = "menu__link"
    elem.setAttribute("data-nav",item.dataset.nav)
    document.querySelector("#navbar__list").appendChild(elem)
    //Dynamic Collapse button
    const collapse = document.createElement("div")
    const collapseIcon = document.createElement("img")
    collapseIcon.setAttribute("src","https://cdn-icons-png.flaticon.com/512/32/32195.png")
    collapse.appendChild(collapseIcon)
    collapse.setAttribute("data-collapse",item.dataset.nav)
    collapse.setAttribute("onclick","hideSection(this)")
    collapse.className="collapse-button"
    item.insertAdjacentElement('afterbegin',collapse)
    
})

function hideSection(elmnt){
    let sectionToCollap = document.querySelector(`main > [data-nav="${elmnt.dataset.collapse}"]`)
    let textToHide = sectionToCollap.querySelectorAll(".landing__container>p")
    textToHide.forEach((e)=>{
        if(e.style.opacity=="0"){
            e.style.opacity = "1"
        }else{
            e.style.opacity = "0"
        }
    })
        
    
}
//Get the viewport and add/remove the "active" class
let scrollingNav;
let scrollingSection;
document.addEventListener("scroll",(e)=>{
    
    document.querySelector(".page__header").style.opacity = "1"
    window.clearTimeout( scrollingNav );
    window.clearTimeout(scrollingSection )
    //Make it run every 200ms only
    scrollingSection = setTimeout(()=>{
        if(window.scrollY+window.innerHeight >= document.body.scrollHeight/2){
            document.querySelector(".scroll-to-top").style.display = "block"
        }else{
            document.querySelector(".scroll-to-top").style.display = "none"
        }
        sections.forEach((section)=>{
        
            let position = section.getBoundingClientRect()
            
            if(position.y > -100 && position.y < position.height/1.2){
                section.classList.add("active")
                document.querySelector(`[data-nav="${section.dataset.nav}"]`).classList.add("active")
            }else{
                section.classList.remove("active")
                document.querySelector(`[data-nav="${section.dataset.nav}"]`).classList.remove("active")
            }
        })
    },200)

    //Hide navbar when user stops scrolling
    scrollingNav = setTimeout(()=>{
        document.querySelector(".page__header").style.opacity = "0"
    },3000)
})
//Make navbar scroll to sections
document.querySelector("ul").addEventListener("click",(e)=>{
    if(e.target.tagName == "LI"){
        let position = document.querySelector(`main>[data-nav="${e.target.dataset.nav}"]`).getBoundingClientRect()
        window.scrollBy(
            {
                top:position.y,
                left:position.x,
                behavior: 'smooth'
            }
        )
    }
})
//Make navbar appear on hover
document.querySelector(".page__header").addEventListener("mouseover",(e)=>{
    document.querySelector(".page__header").style.opacity="1"
})