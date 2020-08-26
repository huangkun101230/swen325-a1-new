import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class EventService {
  public eventListRef: firebase.firestore.CollectionReference;

  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.eventListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  addEvent(
    courseName: string,
    eventName: string,
    startTime: string,
    endTime: string,
    allDay: boolean
  ): Promise<firebase.firestore.DocumentReference> {
    return this.eventListRef.add({
      courseName: courseName,
      eventName: eventName,
      startTime: startTime,
      endTime: endTime,
      allDay: allDay,
    });
  }

  removeEvent(eventId: string): Promise<void> {
    return this.eventListRef.doc(eventId).delete();
  }

  modifyEvent(
    eventId: string,
    courseName: string,
    eventName: string,
    startTime: string,
    endTime: string,
    allDay: boolean
  ): Promise<void> {
    return this.eventListRef.doc(eventId).update({
      courseName: courseName,
      eventName: eventName,
      startTime: startTime,
      endTime: endTime,
      allDay: allDay,
    });
  }

  getEventList(): firebase.firestore.CollectionReference {
    return this.eventListRef;
  }

  getEventDetail(eventId: string): firebase.firestore.DocumentReference {
    return this.eventListRef.doc(eventId);
  }

  getUserId() {
    return this.eventListRef.parent.id;
  }
}
