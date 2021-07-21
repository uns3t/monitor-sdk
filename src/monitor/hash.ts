export default function onHashChange(fn:any) {
    window.addEventListener("hashchange", fn, false);
}