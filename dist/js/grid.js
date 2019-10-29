var DepositData = [{
  No: 1,
  Type: '예금',
  Interest: 0.001,
  Bank: '신한은행',
  Description: '자유입출금',
  Balance: 176385,
}, {
  No: 2,
  Type: '예금',
  Interest: 0.001,
  Bank: '신한은행',
  Description: '청약통장',
  Balance: 320000,
}, {
  No: 3,
  Type: '예금',
  Interest: 0.04,
  Bank: '신한은행',
  Description: '한달애 (愛)',
  Balance: 306191,
}, {
  No: 4,
  Type: '예금',
  Interest: 0.025,
  Bank: '웰컴저축은행',
  Description: '자유입출금',
  Balance: 10000000,
}, {
  No: 5,
  Type: '예금',
  Interest: 0.02,
  Bank: '사이다뱅크',
  Description: '자유입출금',
  Balance: 22000000,
}, {
  No: 6,
  Type: '적금',
  Interest: 0.1,
  Bank: '사이다뱅크',
  Description: '적금이벤트',
  Balance: 200000,
  InstallmentPrice: 100000,
}, {
  No: 7,
  Type: '예금',
  Interest: 0.027,
  Bank: '카카오뱅크',
  Description: '자유적금 예금화',
  Balance: 6000000,
}, {
  No: 8,
  Type: 'CMA',
  Interest: 0.0365,
  Bank: '한화투자증권',
  Description: 'CMA',
  Balance: 3000000,
},];

var DepositCol = [
  { headerName: "번호", field: "No" },
  { headerName: "구분", field: "Type" },
  {
    headerName: "이율", field: "Interest",
    cellRenderer: function (params) {
      return numeral(params.data.Interest).format('0.00%');
    }
  },
  { headerName: "은행", field: "Bank" },
  { headerName: "상품명", field: "Description" },

  {
    headerName: "잔액", field: "Balance",
    cellRenderer: function (params) {
      return numeral(params.data.Balance).format('0,0') + ' 원';
    }
  },
  {
    headerName: "연 수익", field: "Year_Interest",
    cellRenderer: function (params) {
      var result = 0;
      switch (params.data.Type) {
        case '예금':
        case 'CMA':
          result = params.data.Balance * params.data.Interest * 0.846;
          break;
        case '적금':
          var resultValue = 0;
          for (var i = 1; i <= 12; i++) {
            resultValue += params.data.InstallmentPrice * params.data.Interest * 0.846 * i / 12;
          }
          result = resultValue;
          break;
      }
      return numeral(result).format('0,0') + ' 원';
    }
  },
  {
    headerName: "월 수익", field: "Month_Interest",
    cellRenderer: function (params) {
      var result = 0;
      switch (params.data.Type) {
        case '예금':
        case 'CMA':
          result = params.data.Balance * params.data.Interest * 0.846;
          break;
        case '적금':
          var resultValue = 0;
          for (var i = 1; i <= 12; i++) {
            resultValue += params.data.InstallmentPrice * params.data.Interest * 0.846 * i / 12;
          }
          result = resultValue;
          break;
      }
      return numeral(result / 12).format('0,0') + ' 원';
    }
  },
];

var DepositGridOptions = {
  columnDefs: DepositCol,
  enableRangeSelection: true,
  defaultColDef: {
    resizable: true,
    sortable: true,
    filter: true,
    filterParams: {
      selectAllOnMiniFilter: true,
      newRowsAction: 'keep',
      clearButton: true
    },
  },
  rowDragManaged: true,
};
new agGrid.Grid(DepositGrid, DepositGridOptions);

DepositGridOptions.api.setRowData(DepositData);

setTimeout(function () {
}, 1000);

function GetValueTotalAfterCellRenderer(gridOptions, col) {
  var cellRenderer = gridOptions.api.getColumnDef(col).cellRenderer;
  var result = 0;
  gridOptions.api.forEachNode(function (node, index) {
    result += numeral(cellRenderer(node))._value;
  });
  return numeral(result).format(0, 0);
}

Total_Balance.innerHTML = GetValueTotalAfterCellRenderer(DepositGridOptions, 'Balance') + ' 원';
Total_Year_Interest.innerHTML = GetValueTotalAfterCellRenderer(DepositGridOptions, 'Year_Interest') + ' 원';
Total_Month_Interest.innerHTML = GetValueTotalAfterCellRenderer(DepositGridOptions, 'Month_Interest') + ' 원';
