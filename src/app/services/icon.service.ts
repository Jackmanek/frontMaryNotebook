import { Injectable } from "@angular/core"
import { addIcons } from "ionicons"
import {
  add,
  arrowBack,
  calendar,
  camera,
  close,
  create,
  eye,
  eyeOff,
  heart,
  heartOutline,
  image,
  logOut,
  mail,
  person,
  pricetag,
  save,
  search,
  trash,
  filter,
  checkmark,
  logOutOutline,
  imageOutline,
  closeCircle,
  eyeOutline,
  arrowBackOutline,
  trashOutline,
  createOutline
} from "ionicons/icons"

@Injectable({
  providedIn: "root",
})
export class IconService {
  constructor() {
    this.registerIcons()
  }

  private registerIcons(): void {
    addIcons({
      "arrow-back-outline": arrowBackOutline,
      "eye-outline": eyeOutline,
      "log-out-outline": logOutOutline,
      add: add,
      "arrow-back": arrowBack,
      calendar: calendar,
      "image-outline": imageOutline,
      camera: camera,
      "trash-outline": trashOutline,
      close: close,
      "create-outline": createOutline,
      "close-circle": closeCircle,
      create: create,
      eye: eye,
      "eye-off": eyeOff,
      heart: heart,
      "heart-outline": heartOutline,
      image: image,
      "log-out": logOut,
      mail: mail,
      person: person,
      pricetag: pricetag,
      save: save,
      search: search,
      trash: trash,
      filter: filter,
      checkmark: checkmark,
    })
  }
}
