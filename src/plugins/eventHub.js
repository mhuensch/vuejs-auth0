export default function install (Vue, options) {
  // Define our global event hub to make the following availiable to all components:
  // $eventHub.$on: start listening for events
  // $eventHub.$off: stop listening for events
  // $eventHub.$emit: send events to all listeners

  // Creating a new Vue instance is the simplest way to have an event hub.
  Vue.prototype.$eventHub = new Vue()
}
