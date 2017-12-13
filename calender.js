      class eventsDirectory {
            constructor(eventsTime) {
                this.events = eventsTime.sort((a, b) => { return parseFloat(a.start) - parseFloat(b.start); });
                this.collisions = [];
                this.deleteEvents();
                this.findCollisions();
                this.createRowsColums();
                this.draw();
            }

            findCollisions() {
                let collisions = [];
                collisions[0] = [];
                collisions[0].push(this.events[0]);
                this.events.length===1?this.collisions=collisions:'';
                this.events.reduce((prevItem, nextItem, index, array) => {
                    if (this.isCollide(nextItem, prevItem)) {
                        let filterData = collisions.map((fItem, index) => {
                            return fItem.filter(item => {
                                return item.start === prevItem.start && item.end === prevItem.end;
                            })
                        })
                        if (filterData.length > 0) {
                            collisions[collisions.length - 1].push(nextItem);
                        }

                    } else {
                        collisions.push([nextItem])
                    }
                    this.collisions = collisions;
                    return prevItem = nextItem;

                })

            }
            createRowsColums() {
                this.collisions.forEach((item, index) => {
                    let row = [];
                    row[0] = [];
                    item.forEach(subItem => {
                        let col = 0;
                        let isvalid = true
                        while (isvalid) {
                            let rowIndex = this.getRow(row, col);
                            if (rowIndex) {
                                row[0].push(subItem);
                                isvalid = false;
                            } else {
                                let lastEvent = row[rowIndex][col];
                                if (!this.isCollide(subItem, lastEvent)) {
                                    if (row[rowIndex + 1] === undefined) {
                                        row[rowIndex + 1] = [];
                                    }
                                    row[rowIndex + 1][col] = subItem;
                                    isvalid = false;
                                }
                            }
                            col++;
                        }
                    })
                    this.setPositions(row)
                })
            }
            setPositions(row) {
                let rowLength = 1;
                row.forEach(item => {
                    rowLength = Math.max(rowLength, item.length);
                    item.forEach((subItem, index) => {
                        subItem.width = 590 / rowLength;
                        subItem.top = subItem.start;
                        subItem.height = subItem.end - subItem.start;
                        subItem.left = (subItem.width * index) + (9)
                    })
                })
            }
            isCollide(currentEvent, previousEvent) {
                if ((currentEvent.start <= previousEvent.start && previousEvent.start <= currentEvent.end) ||
                    (currentEvent.start <= previousEvent.end && previousEvent.end <= currentEvent.end) ||
                    (previousEvent.start <= currentEvent.start && currentEvent.start <= previousEvent.end) ||
                    (previousEvent.start <= currentEvent.end && currentEvent.end <= previousEvent.end)) {
                    return true;
                }
                return false;
            }
            getRow(tRow, col) {
                var valid = tRow.length;
                while (valid--) {
                    if (tRow[valid][col] !== undefined) return valid;
                }
                return true;
            }

            draw() {
                var nFilter = '';
                this.events.forEach((item, index) => {
                    nFilter = document.createElement('div');
                    nFilter.className = 'event';
                    nFilter.innerHTML = '<p class="item">Sample Item</p><p class="location">Sample location</p>';
                    nFilter.style.width = item.width + "px";
                    nFilter.style.top = item.top + "px";
                    nFilter.style.height = item.height + "px";
                    nFilter.style.left = item.left + "px";
                    document.getElementById('calendar').appendChild(nFilter);
                })
            }
            deleteEvents(){
               document.getElementById('calendar').innerHTML='';
            }



        }

        function layOutDay(outerEvents) {
            let events = [
                {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}
            ];
            outerEvents?events=outerEvents:events=events;
            let initlayOutDay = new eventsDirectory(events);
        }
        layOutDay();