export const getMemberColor = (rank) => {
    switch(rank) {
        case 1:
            return '#ffe9ce';
        case 2:
            return '#FFD97D';
        case 3:
            return '#aaf683';
        case 4:
            return '#064789';
        case 5:
            return '#ee6055';
        default:
            return 'black';
    }
}
