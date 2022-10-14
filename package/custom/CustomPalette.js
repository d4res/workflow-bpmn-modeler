export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory
    this.bpmnFactory = bpmnFactory
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate

    palette.registerProvider(this)
  }
  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this

    function createDMNTask() {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:UserTask')

        businessObject['flowable:assignee'] = 'zhangsan'
        businessObject['flowable:formKey'] = 'fakeForm'
        businessObject['flowable:fakeForm'] = 'ttestt'
        console.log(businessObject)

        const shape = elementFactory.createShape({
          type: 'bpmn:UserTask',
          businessObject: businessObject
        })

        create.start(event, shape)
      }
    }

    return {
      'create.demo': {
        group: 'activity',
        className: 'bpmn-icon-user',
        title: translate('this is a demo test'),
        action: {
          dragstart: createDMNTask(),
          click: createDMNTask()
        }
      }
    }
  }
}
