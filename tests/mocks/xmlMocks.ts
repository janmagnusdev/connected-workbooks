export const connectedWorkbookXmlMock =
    '<?xml version="1.0" encoding="utf-8"?><ConnectedWorkbook xmlns="http://schemas.microsoft.com/ConnectedWorkbook" version="1.0.0"></ConnectedWorkbook>';
export const sheetsXmlMock =
    '<sheetData><row r="1" spans="1:2" x14ac:dyDescent="0.3"><c r="A1" t="str"><v>Column1</v></c><c r="B1" t="str"><v>Column2</v></c></row><row r="2" spans="1:2" x14ac:dyDescent="0.3"><c r="A2" t="str"><v>1</v></c><c r="B2" t="1"><v>2</v></c></row></sheetData>';
export const addZeroSheetsXmlMock =
    '<sheetData><row r="1" spans="1:2" x14ac:dyDescent="0.3"><c r="A1" t="str"><v>Column1</v></c><c r="B1" t="str"><v>Column2</v></c></row><row r="2" spans="1:2" x14ac:dyDescent="0.3"><c r="A2" t="str"><v>one</v></c><c r="B2" t="1"><v>0</v></c></row><row r="3" spans="1:2" x14ac:dyDescent="0.3"><c r="A3" t="str"><v>two</v></c><c r="B3" t="1"><v>2</v></c></row></sheetData>';
export const workbookXmlMock =
    '<definedName name="ExternalData_1" localSheetId="0" hidden="1">Query1!$A$1:$B$2</definedName>';
export const queryTableMock =
    '<queryTableRefresh nextId="3"><queryTableFields count="2"><queryTableField id="1" name="Column1" tableColumnId="1"/><queryTableField id="2" name="Column2" tableColumnId="2"/></queryTableFields></queryTableRefresh></queryTable>';
export const sharedStringsXmlMock = `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="2" uniqueCount="2"><si><t>Query1</t></si><si><t/></si><si><t>newQueryName</t></si></sst>`;

export const existingSharedStringsXmlMock = `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="1" uniqueCount="1"><si><t>newQueryName</t></si><si><t/></si></sst>`;

export const pqMetadataXmlMockPart1 =
    '<LocalPackageMetadataFile xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><Items>    <Item>      <ItemLocation>        <ItemType>AllFormulas</ItemType>        <ItemPath/>      </ItemLocation>      <StableEntries/>    </Item>    <Item>      <ItemLocation>        <ItemType>Formula</ItemType>        <ItemPath>Section1/newQueryName</ItemPath>      </ItemLocation>      <StableEntries>        <Entry Type="IsPrivate" Value="l0"/>        <Entry Type="FillEnabled" Value="l1"/>        <Entry Type="FillObjectType" Value="sTable"/>        <Entry Type="FillToDataModelEnabled" Value="l0"/>       <Entry Type="BufferNextRefresh" Value="l1"/>        <Entry Type="ResultType" Value="sTable"/>        <Entry Type="NameUpdatedAfterFill" Value="l0"/>        <Entry Type="NavigationStepName" Value="sNavigation"/>        <Entry Type="FillTarget" Value="snewQueryName"/>        <Entry Type="FilledCompleteResultToWorksheet" Value="l1"/>        <Entry Type="AddedToDataModel" Value="l0"/>        <Entry Type="FillCount" Value="l1"/>        <Entry Type="FillErrorCode" Value="sUnknown"/>        <Entry Type="FillErrorCount" Value="l0"/>';
export const pqMetadataXmlMockPart2 =
    '<Entry Type="FillColumnTypes" Value="sBg=="/>        <Entry Type="FillColumnNames" Value="s[&quot;newQueryName&quot;]"/>        <Entry Type="FillStatus" Value="sComplete"/>        <Entry Type="RelationshipInfoContainer" Value="s{&quot;columnCount&quot;:1,&quot;keyColumnNames&quot;:[],&quot;queryRelationships&quot;:[],&quot;columnIdentities&quot;:[&quot;Section1/newQueryName/AutoRemovedColumns1.{newQueryName,0}&quot;],&quot;ColumnCount&quot;:1,&quot;KeyColumnNames&quot;:[],&quot;ColumnIdentities&quot;:[&quot;Section1/newQueryName/AutoRemovedColumns1.{newQueryName,0}&quot;],&quot;RelationshipInfo&quot;:[]}"/>      </StableEntries>    </Item>    <Item>      <ItemLocation>        <ItemType>Formula</ItemType>        <ItemPath>Section1/newQueryName/Source</ItemPath>      </ItemLocation>      <StableEntries/>    </Item>  </Items> </LocalPackageMetadataFile>';
