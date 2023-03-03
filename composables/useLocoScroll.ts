import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export const useLocoScroll = () => {
    const locoScroll = ref<LocomotiveScroll>();

    onMounted(async () => {
        const { default: LocomotiveScroll } = await import('locomotive-scroll');

        const scrollEl = document.querySelector('#js-scroll') as HTMLDivElement
        console.log(scrollEl, 'scrollEl');

        locoScroll.value = new LocomotiveScroll({
            el: scrollEl,
            smooth: true,
            smartphone: {
                smooth: true
            },
            multiplier: 0.55,
            class: "revealed",
            lerp: 0.07
        })

        locoScroll.value.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy("#js-scroll", {

            scrollTop(value) {
                // @ts-ignore
                if (locoScroll.value) {
                    // @ts-ignore
                    //console.log(locoScroll.value.scrollTo(value, 0, 0), 'aa', locoScroll.value.scroll.instance.scroll.y);
                    return arguments.length
                        // @ts-ignore
                        ? locoScroll.value.scrollTo(value, { disableLerp: true, duration: 0 })
                        // @ts-ignore
                        : locoScroll.value.scroll.instance.scroll.y;
                }
                return null;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
        });




        ScrollTrigger.addEventListener("refresh", lsUpdate)
        ScrollTrigger.refresh()
        ScrollTrigger.defaults({
            scroller: scrollEl,
        });
    })
    const lsUpdate = () => {
        console.log(locoScroll.value, 'lsUpdate');
        if (locoScroll.value) {
            locoScroll.value.update();
        }
    };

    const timer = setTimeout(function () {
        locoScroll.value?.update();
        console.log("updating");
    }, 100);

    onUnmounted(() => {
        if (locoScroll.value) {
            ScrollTrigger.removeEventListener("refresh", lsUpdate);
            locoScroll.value.destroy();
            locoScroll.value = undefined
            clearTimeout(timer)
        }
    });

    return { locoScroll }
}