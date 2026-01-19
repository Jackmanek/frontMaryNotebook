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
  createOutline,
  personOutline,
  homeOutline,
  alertCircleOutline,
  globeOutline,
  lockClosedOutline,
  shieldOutline
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
      "alert-circle-outline": alertCircleOutline,
      "eye-outline": eyeOutline,
      "log-out-outline": logOutOutline,
      add: add,
      "lock-closed-outline" : lockClosedOutline,
      "globe-outline" : globeOutline,
      "arrow-back": arrowBack,
      calendar: calendar,
      "home-outline": homeOutline,
      "image-outline": imageOutline,
      camera: camera,
      "person-outline":personOutline,
      "trash-outline": trashOutline,
      close: close,
      "create-outline": createOutline,
      "close-circle": closeCircle,
      create: create,
      "shield-outline": shieldOutline,
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
