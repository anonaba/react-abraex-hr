import { 
    SecondDiv,
    Container, 
    Grid, 
    Header, 
    LogoPic, 
    SecondHeader,
    SecondDivTwo,
    FirstDiv,
    Input,
    DivTwo,
    ShortText,
    Label,
    Paragraph,
    Button,
    Buttondiv
} from "./style"

const Registration: React.FC = () => {
    return (
        <Container fluid>
            <Header>Company Profile</Header>
            <SecondHeader>COMPANY INFORMATION</SecondHeader>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Company Logo(100 x 100 pixels)</Label>
                </FirstDiv>
                <SecondDiv>
                    <div>
                        <LogoPic>

                        </LogoPic>
                    </div>
                    <SecondDivTwo>
                        <input type="file" name="" id="formFile" />
                    </SecondDivTwo>
                </SecondDiv>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Company Name*</Label>
                </FirstDiv>
                <DivTwo>
                    <Input type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Nature Of Business</Label>
                </FirstDiv>
                <DivTwo>
                    <Input type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Address 1*</Label>
                </FirstDiv>
                <DivTwo>
                    <Input type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Address 2</Label>
                </FirstDiv>
                <DivTwo>
                    <Input type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">ZIP Code</Label>
                </FirstDiv>
                <DivTwo>
                    <ShortText type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">RDO</Label>
                </FirstDiv>
                <DivTwo>
                    <ShortText type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Email</Label>
                </FirstDiv>
                <DivTwo>
                    <Input type="email" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Phone</Label>
                </FirstDiv>
                <DivTwo>
                    <ShortText type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Fax</Label>
                </FirstDiv>
                <DivTwo>
                    <ShortText type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">SSS</Label>
                </FirstDiv>
                <DivTwo>
                    <ShortText type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">PhilHealth</Label>
                </FirstDiv>
                <DivTwo>
                    <ShortText type="text" name="" id="" placeholder="_._______._"/>
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">HDMF</Label>
                </FirstDiv>
                <DivTwo>
                    <ShortText type="text" name="" id="" placeholder="__.__.__"/>
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <label htmlFor="">Admin Signatory</label>
                    <Paragraph>*For Payroll Summary and Employer Contribution</Paragraph>
                </FirstDiv>
                <DivTwo>
                    <Paragraph>Autorized Person:</Paragraph>
                    <ShortText type="text"/>
                    <Paragraph>Position Title:</Paragraph>
                    <ShortText type="text"/>
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <label htmlFor="">HR Signatory</label>
                </FirstDiv>
                <DivTwo>
                    <Paragraph>Autorized Person:</Paragraph>
                    <ShortText type="text"/>
                    <Paragraph>Position Title:</Paragraph>
                    <ShortText type="text"/>
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <label htmlFor="">Finance Signatory</label>
                </FirstDiv>
                <DivTwo>
                    <Paragraph>Autorized Person:</Paragraph>
                    <ShortText type="text"/>
                    <Paragraph>Position Title:</Paragraph>
                    <ShortText type="text"/>
                </DivTwo>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">E-Signatory</Label>
                </FirstDiv>
                <SecondDiv>
                    <div>
                        <LogoPic>

                        </LogoPic>
                    </div>
                    <SecondDivTwo>
                        <input type="file" name="" id="formFile" />
                    </SecondDivTwo>
                </SecondDiv>
            </Grid>
            <Grid>
                <FirstDiv>
                    <Label htmlFor="">Sub Domain</Label>
                </FirstDiv>
                <DivTwo>
                    <Input type="text" name="" id="" />
                </DivTwo>
            </Grid>
            <Buttondiv>
                <Button color="primary">Submit</Button>
            </Buttondiv>
        </Container>
    )
}

export default Registration