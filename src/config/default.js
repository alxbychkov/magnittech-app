export const STEPS = ['general', 'documents', 'comments'];

export const INITIAL_TASK = {
    _id: "",
    name: "",
    status: "Создан",
    description: "",
    files: [],
    comments: [],
    ends: (new Date()).toLocaleDateString('fr-CA'),
  };

export const MODAL_TYPES = {
    cancel: {
        type: 'cancel',
        title: `Отменить изменения?`,
        slot: `Внесенные вами изменения будут утеряны.`,
        buttons: ['Отмена','Выйти']
    },
    save: {
        type: 'save',
        title: `Сохранить изменения?`,
        slot: `Все изменения будут сохранены. После вы сможете их отредактировать.`,
        buttons: ['Отмена','Сохранить']
    },
    delete: {
        type: 'delete',
        title: `Удалить выбранное ?`,
        slot: [`Выбранные вами объекты удалятся без возможности восстановления.`,'Выбрано объектов:'],
        buttons: ['Отмена','Удалить']
    }
}