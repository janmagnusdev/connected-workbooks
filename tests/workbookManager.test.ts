import workbookTemplate from "../src/workbookTemplate";
import { WorkbookManager }  from "../src/workbookManager";
import { connectionsXmlPath, sharedStringsXmlPath } from "../src/constants";
import { sharedStringsXmlMock, existingSharedStringsXmlMock } from "./mocks";
import { dataTypes } from "../src/types";
import { sheetsXmlMock, workbookXmlMock, queryTableMock, addZeroSheetsXmlMock } from "./mocks";

describe("Workbook Manager tests", () => {
    const workbookManager = new WorkbookManager() as any;
    const mockConnectionString = `<connections xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:xr16="http://schemas.microsoft.com/office/spreadsheetml/2017/revision16" mc:Ignorable="xr16">
        <connection id="1" xr16:uid="{86BA784C-6640-4989-A85E-EB4966B9E741}" keepAlive="1" name="Query - Query1" description="Connection to the 'Query1' query in the workbook." type="5" refreshedVersion="7" background="1" saveData="1">
        <dbPr connection="Provider=Microsoft.Mashup.OleDb.1;Data Source=$Workbook$;Location=Query1;" command="SELECT * FROM [Query1]"/></connection></connections>`;

    test("Connection XML attributes contain new query name", async () => {
        const {connectionXmlFileString} = await workbookManager.updateConnections(mockConnectionString, "newQueryName", true);
        expect(connectionXmlFileString.replace(/ /g, "")).toContain('command="SELECT * FROM [newQueryName]'.replace(/ /g, ""));
        expect(connectionXmlFileString.replace(/ /g, "")).toContain('name="Query - newQueryName"'.replace(/ /g, ""));
        expect(connectionXmlFileString.replace(/ /g, "")).toContain(`description="Connection to the 'newQueryName' query in the workbook."`.replace(/ /g, ""));
    })

    test("Connection XML attributes contain refreshOnLoad value", async () => {
        const {connectionXmlFileString} = await workbookManager.updateConnections(mockConnectionString, "newQueryName", true);
        expect(connectionXmlFileString.replace(/ /g, "")).toContain('refreshOnLoad="1"');
    })

    test("SharedStrings XML contains new query name", async () => {
        const {newSharedStrings} = await workbookManager.updateSharedStrings('<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="1" uniqueCount="1"><si><t>Query1</t></si><si><t/></si></sst>', "newQueryName");
        expect(newSharedStrings.replace(/ /g, "")).toContain(sharedStringsXmlMock.replace(/ /g, ""));
    })

    test("Tests SharedStrings update when XML contains query name", async () => {
        const {newSharedStrings} = await workbookManager.updateSharedStrings('<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="1" uniqueCount="1"><si><t>newQueryName</t></si><si><t/></si></sst>', "newQueryName");
        expect(newSharedStrings.replace(/ /g, "")).toContain(existingSharedStringsXmlMock.replace(/ /g, ""));
    })

    test("SharedStrings XML returns new index", async () => {
        const {sharedStringIndex} = await workbookManager.updateSharedStrings('<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="1" uniqueCount="1"><si><t>Query1</t></si><si><t/></si></sst>', "newQueryName");
        expect(sharedStringIndex).toEqual(2);
    })
    test("test valid initial data in SheetsXML", async () => {
        const defaultString = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac xr xr2 xr3" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xr="http://schemas.microsoft.com/office/spreadsheetml/2014/revision" xmlns:xr2="http://schemas.microsoft.com/office/spreadsheetml/2015/revision2" xmlns:xr3="http://schemas.microsoft.com/office/spreadsheetml/2016/revision3" xr:uid="{EDF0138E-D216-4CD1-8EFA-1396A1BB4478}"><sheetPr codeName="Sheet1"/><dimension ref="A1:A2"/><sheetViews><sheetView tabSelected="1" workbookViewId="0"/></sheetViews><sheetFormatPr defaultRowHeight="14.4" x14ac:dyDescent="0.3"/><cols><col min="1" max="1" width="9.6640625" bestFit="1" customWidth="1"/></cols><sheetData><row r="1" spans="1:1" x14ac:dyDescent="0.3"><c r="A1" t="s"><v>0</v></c></row><row r="2" spans="1:1" x14ac:dyDescent="0.3"><c r="A2" t="s"><v>1</v></c></row></sheetData><pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/><tableParts count="1"><tablePart r:id="rId1"/></tableParts></worksheet>';
        const sheetsXmlString = await workbookManager.updateSheetsInitialData(defaultString, {columnMetadata: [{name: 'Column1', type: dataTypes.string}, {name: 'Column2', type: dataTypes.number} ], data: [['1', '2']]});
        expect(sheetsXmlString).toContain(sheetsXmlMock);  
    })

    test("tests workbookXML contains initial data dimensions", async () => {
        const defaultString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\r\n<workbook xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\" xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" mc:Ignorable=\"x15 xr xr6 xr10 xr2\" xmlns:x15=\"http://schemas.microsoft.com/office/spreadsheetml/2010/11/main\" xmlns:xr=\"http://schemas.microsoft.com/office/spreadsheetml/2014/revision\" xmlns:xr6=\"http://schemas.microsoft.com/office/spreadsheetml/2016/revision6\" xmlns:xr10=\"http://schemas.microsoft.com/office/spreadsheetml/2016/revision10\" xmlns:xr2=\"http://schemas.microsoft.com/office/spreadsheetml/2015/revision2\"><fileVersion appName=\"xl\" lastEdited=\"7\" lowestEdited=\"7\" rupBuild=\"24729\"/><workbookPr codeName=\"ThisWorkbook\" defaultThemeVersion=\"166925\"/><mc:AlternateContent xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\"><mc:Choice Requires=\"x15\"><x15ac:absPath url=\"C:\\Users\\v-ahmadsbeih\\Desktop\\\" xmlns:x15ac=\"http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac\"/></mc:Choice></mc:AlternateContent><xr:revisionPtr revIDLastSave=\"0\" documentId=\"13_ncr:1_{93EF201C-7856-4B60-94D4-65DDB8F3F16A}\" xr6:coauthVersionLast=\"47\" xr6:coauthVersionMax=\"47\" xr10:uidLastSave=\"{00000000-0000-0000-0000-000000000000}\"/><bookViews><workbookView xWindow=\"28680\" yWindow=\"-120\" windowWidth=\"29040\" windowHeight=\"15990\" xr2:uid=\"{DB915CB9-8DD9-492A-A471-C61E61200113}\"/></bookViews><sheets><sheet name=\"Query1\" sheetId=\"2\" r:id=\"rId1\"/><sheet name=\"Sheet1\" sheetId=\"1\" r:id=\"rId2\"/></sheets><definedNames><definedName name=\"ExternalData_1\" localSheetId=\"0\" hidden=\"1\">Query1!$A$1:$A$2</definedName></definedNames><calcPr calcId=\"191029\"/><extLst><ext uri=\"{140A7094-0E35-4892-8432-C4D2E57EDEB5}\" xmlns:x15=\"http://schemas.microsoft.com/office/spreadsheetml/2010/11/main\"><x15:workbookPr chartTrackingRefBase=\"1\"/></ext><ext uri=\"{B58B0392-4F1F-4190-BB64-5DF3571DCE5F}\" xmlns:xcalcf=\"http://schemas.microsoft.com/office/spreadsheetml/2018/calcfeatures\"><xcalcf:calcFeatures><xcalcf:feature name=\"microsoft.com:RD\"/><xcalcf:feature name=\"microsoft.com:FV\"/><xcalcf:feature name=\"microsoft.com:LET_WF\"/><xcalcf:feature name=\"microsoft.com:LAMBDA_WF\"/></xcalcf:calcFeatures></ext></extLst></workbook>"
        const worksheetXml = await workbookManager.updateWorkbookInitialData(defaultString, {columnMetadata: [{name: 'Column1', type: dataTypes.string}, {name: 'Column2', type: dataTypes.number} ],
                data: [['1', '2']]});
        expect(worksheetXml).toContain(workbookXmlMock);
    })

    test("tests Pivot Tables contain initial data", async () => {
        const defaultString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\r\n<table xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" mc:Ignorable=\"xr xr3\" xmlns:xr=\"http://schemas.microsoft.com/office/spreadsheetml/2014/revision\" xmlns:xr3=\"http://schemas.microsoft.com/office/spreadsheetml/2016/revision3\" id=\"1\" xr:uid=\"{D8539CF6-04E5-464D-9950-5A36C5A1FCFE}\" name=\"Query1\" displayName=\"Query1\" ref=\"A1:A2\" tableType=\"queryTable\" totalsRowShown=\"0\"><autoFilter ref=\"A1:A2\" xr:uid=\"{D8539CF6-04E5-464D-9950-5A36C5A1FCFE}\"/><tableColumns count=\"1\"><tableColumn id=\"1\" xr3:uid=\"{D1084858-8AE5-4728-A9BE-FE78821CDFFF}\" uniqueName=\"1\" name=\"Query1\" queryTableFieldId=\"1\" dataDxfId=\"0\"/></tableColumns><tableStyleInfo name=\"TableStyleMedium7\" showFirstColumn=\"0\" showLastColumn=\"0\" showRowStripes=\"1\" showColumnStripes=\"0\"/></table>";
        const tableXmlSheet = await workbookManager.updateTablesInitialData(defaultString, {columnMetadata: [{name: 'Column1', type: dataTypes.string}, {name: 'Column2', type: dataTypes.number} ],
                data: [['1', '2']]});
        expect(tableXmlSheet).toContain('count="2"');
        expect(tableXmlSheet).toContain('ref="A1:B2');
        expect(tableXmlSheet).toContain('uniqueName="1" name="Column1" queryTableFieldId="1"');
        expect(tableXmlSheet).toContain('uniqueName="2" name="Column2" queryTableFieldId="2"'); 
    })
    

    test("SharedStrings XML returns existing index", async () => {
        const {sharedStringIndex} = await workbookManager.updateSharedStrings('<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="1" uniqueCount="1"><si><t>newQueryName</t></si><si><t/></si></sst>', "newQueryName");
        expect(sharedStringIndex).toEqual(1);
    })

    test("Table XML contains refrshonload value", async () => {
        const {sharedStringIndex, newSharedStrings} = await workbookManager.updateSharedStrings('<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="1" uniqueCount="1"><si><t>Query1</t></si><si><t/></si></sst>', "newQueryName");
        expect(sharedStringIndex).toEqual(2);
        expect(newSharedStrings.replace(/ /g, "")).toContain(sharedStringsXmlMock.replace(/ /g, ""));
    })

    test("tests Query Tables contain initial data", async () => {
        const defaultString = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\r\n<queryTable xmlns=\"http://schemas.openxmlformats.org/spreadsheetml/2006/main\" xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\" mc:Ignorable=\"xr16\" xmlns:xr16=\"http://schemas.microsoft.com/office/spreadsheetml/2017/revision16\" name=\"ExternalData_1\" connectionId=\"1\" xr16:uid=\"{24C17B89-3CD3-4AA5-B84F-9FF5F35245D7}\" autoFormatId=\"16\" applyNumberFormats=\"0\" applyBorderFormats=\"0\" applyFontFormats=\"0\" applyPatternFormats=\"0\" applyAlignmentFormats=\"0\" applyWidthHeightFormats=\"0\"><queryTableRefresh nextId=\"2\"><queryTableFields count=\"1\"><queryTableField id=\"1\" name=\"Query1\" tableColumnId=\"1\"/></queryTableFields></queryTableRefresh></queryTable>";
        const queryTableXmlSheet = await workbookManager.updateQueryTablesInitialData(defaultString, {columnMetadata: [{name: 'Column1', type: dataTypes.string}, {name: 'Column2', type: dataTypes.number} ],
                data: [['1', '2']]});
        expect(queryTableXmlSheet).toContain(queryTableMock);
    })

});