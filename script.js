/**
 *  Hinzufügen des Items
 * var count ließt die Anzahl aus, wie oft das Item eingetragen werden soll
 * var item ist das Item was hinzugefügt werden soll
 * Die Funktion checkFirstLetter wird aufgerufen, um zu überprüfen, ob das Item mit einem Großbuchstaben anfängt.
 * -> ist dies so, wird das Item hinzugefügt, in einer Schleife, je nach dem wie oft das Item hinzugefügt werden soll
 * -> ist dies nicht so, gibt es einer Fehlermeldung
 * Danach wird die neue itemList gespeichert, geupdated und die Anzahl unten angepasst
 */ 
function addShoppingItem() {
    var count = document.getElementById("valueItem").value;
    var item = document.getElementById("shoppingItem").value;
    if (checkFirstLetter(item)) {
        var itemList = getItemList();
        for (let i = 1; i <= count; i++) {
        itemList.push(item)
        }
        document.getElementsByClassName("error_input").innerHTML = "";
    } else {
        return alert("Bitte den Anfangsbuchstaben Groß machen!");
    }
    saveItemList(itemList);
    updateItemList();
    updateItemEntries();
}

/**
 * Aktualisierung der itemList
 * Wenn neue Items hinzugefügt werden, wird die aktuelle Liste (im Frontend) geleert und neu befüllt mit den neuesten Items
 * In der for-Schleife werden alle Items durchgezählt und mit eigener ID versehen, als LI anzeigt und einem EventListener hinterlegt für das abhacken im Frontend
 */
function updateItemList() {
    var itemList = getItemList();
    var listContainer = document.getElementById('itemList');

    listContainer.innerHTML = '';

    for (let i = 0; i < itemList.length; i++) {
        var listItem = document.createElement('li');
        listItem.addEventListener("click", function() {
            this.className = this.className.replace("active", "deactive");
            updateItemEntries();
        })
        listItem.id = 'item-' + i;
        listItem.className = "active";
        listItem.innerHTML = itemList[i];
        listContainer.appendChild(listItem)
    }
}


/**
 * Überprüfung des ersten Buchstabens
 * Übergabe eines Strings und der erste Index wird geprüft, ob dieser Groß ist, gibt ein bool zurück
 */
function checkFirstLetter(shoppingItem) {
    return shoppingItem.charAt(0) === shoppingItem.charAt(0).toUpperCase();
}

/**
 * Array leeren
 * Wird nach Buttonklick ausgeführt, array wird auf länge 0 gesetzt und dadurch geleert und alles, was damit zusammen hängt aktualisiert
 */
function removeAllShoppingItems() {
    var itemList = getItemList();
    itemList.length = 0;
    saveItemList(itemList);
    updateItemList();
    updateItemEntries();
}

/**
 * Lokal speichern
 * Es wird die aktuelle itemList übergeben und in dem lokalen Storage gespeichert
 */
function saveItemList(itemList) {
    localStorage.setItem('shoppingList', JSON.stringify(itemList));
}

/**
 * Lokale liste abholen
 * Die lokale Liste wird aus dem lokalen Speicher geholt
 */
function getItemList() {
    var savedList = localStorage.getItem('shoppingList');
    return savedList ? JSON.parse(savedList) : [];
}

/**
 * Anzahl der Elemente mit klasse X
 * Klassenname wird übergeben, es wird geschaut, wie oft der klassenname vorhanden ist
 */
function countActiveItems(className) {
    var elements = document.querySelectorAll('.' + className);
    return elements.length;
}

/**
 * Texterstellung
 * erstellt den Text, um zu sehen, wie viele aktive Items man noch hat, im Vergleich zur Länge vom Array
 */
function updateItemEntries() {
    var itemEntries = "Noch " + countActiveItems("active") + " von " + getItemList().length + " Einträgen";
    document.getElementById("getItemEntries").innerHTML = itemEntries;
}

/**
 * Ruft die beiden Funktioen auf, dass direkt alles da ist
 */
updateItemList();
updateItemEntries();
