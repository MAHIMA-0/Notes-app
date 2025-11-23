let notes=[]
export async function GET(){
  return Response.json(notes)
}

export async function POST(req){
  const r=await req.json()
  notes.push({id:Date.now(),title:r.title})
  return Response.json({success:true})
}

export async function PUT(req){
  const r=await req.json()
  notes=notes.map((note)=>(
    note.id===r.id ? {...note,title:r.title}: note)
  )
  return Response.json({success:true})
}

export async function DELETE(req){
  const r=await req.json()
  notes=notes.filter((note)=>note.id!=r.id)
  return Response.json({success:true})
}


